# Agent 输入框移动端键盘适配原理

## 1. 需求背景

`agent-panel` 原来使用普通 `div` 展示提示文字，不能真正输入内容。移动端改成原生 `textarea` 后，还需要处理软键盘弹出时输入框被遮挡的问题。

本次目标：

- 输入区域使用原生 `textarea`，支持中文输入和多行换行。
- iPhone 和 Android 弹出软键盘时，输入框尽量保持在可视区域内。
- 只滚动页面中的 `.page-content`，不修改推荐内容、发送按钮和底部导航逻辑。

## 2. 为什么键盘会遮挡输入框

移动端浏览器存在两个不同的视口概念。

### 2.1 Layout Viewport

Layout Viewport 是浏览器进行页面布局时使用的区域。`height: 100%`、`100vh` 和元素定位通常以它为基础。

### 2.2 Visual Viewport

Visual Viewport 是用户当前真正能够看到的区域。软键盘弹出后，键盘会占用屏幕空间，Visual Viewport 的高度通常会缩小。

```text
键盘弹出前：

┌──────────────────────┐
│                      │
│    Visual Viewport   │
│                      │
│      textarea        │
│                      │
└──────────────────────┘

键盘弹出后：

┌──────────────────────┐
│  Visual Viewport     │
│      textarea        │
├──────────────────────┤
│      软键盘区域       │
└──────────────────────┘
```

iOS Safari 弹出键盘时，不一定会同步改变 Layout Viewport。页面看起来仍然保持原来的布局高度，但用户实际能看到的区域已经变小，因此仅依赖 `100vh` 或 CSS 很难准确判断输入框是否被遮挡。

## 3. 为什么使用 `visualViewport`

`window.visualViewport` 可以获取当前真实可视区域的信息：

- `visualViewport.height`：可视区域高度。
- `visualViewport.offsetTop`：可视区域相对于布局视口顶部的偏移量。
- `resize` 事件：软键盘展开或收起导致可视区域变化时触发。

可视区域底部坐标的计算方式：

```js
const visibleBottom = visualViewport.offsetTop + visualViewport.height;
```

输入框底部坐标通过 `getBoundingClientRect()` 获取：

```js
const textareaRect = textarea.getBoundingClientRect();
```

如果输入框底部大于可视区域底部，说明输入框已经被键盘遮挡：

```js
const hiddenHeight = textareaRect.bottom + VIEWPORT_PADDING - visibleBottom;
```

其中 `VIEWPORT_PADDING` 用于让输入框和键盘之间保留少量间距。

## 4. 当前实现方式

### 4.1 使用原生 `textarea`

文件：`src/components/cloud-operation/AgentPanel.vue`

```vue
<textarea
  ref="textareaRef"
  class="composer-input"
  rows="3"
  placeholder="请您描述问题或输入@选择技能"
  aria-label="请输入问题"
  @focus="handleComposerFocus"
  @blur="handleComposerBlur"
></textarea>
```

关键点：

- `ref` 用于在 composable 中获取真实 DOM。
- `rows="3"` 提供多行输入能力。
- `placeholder` 保留原来的提示文字。
- `aria-label` 为读屏软件提供明确说明。
- `focus` 时开始监听视口变化。
- `blur` 时移除监听，防止重复绑定和内存泄漏。

### 4.2 textarea 样式

```less
.composer-input {
  width: 100%;
  height: 100%;
  padding: 14px 48px 34px 46px;
  border: 0;
  border-radius: 12px;
  color: #494461;
  background: transparent;
  font-family: inherit;
  font-size: 16PX;
  line-height: 20px;
  resize: none;
  -webkit-appearance: none;
}
```

样式作用：

- 左侧 `46px` 为相机图标预留空间。
- 右侧 `48px`、底部 `34px` 为发送图标预留空间。
- `resize: none` 隐藏浏览器默认拖动手柄。
- `-webkit-appearance: none` 移除 iOS 默认输入框外观。
- `font-size: 16PX` 很重要。iOS Safari 在输入框字体小于 `16px` 时可能自动放大页面，造成页面跳动或布局看起来被顶得过高。

### 4.3 监听键盘引起的可视区域变化

文件：`src/components/cloud-operation/useAgentPanel.js`

核心逻辑：

```js
function keepComposerVisible() {
  const textarea = textareaRef.value;
  const visualViewport = window.visualViewport;
  if (!textarea || !visualViewport) {
    return;
  }

  const pageContent = textarea.closest('.page-content');
  if (!pageContent) {
    return;
  }

  const textareaRect = textarea.getBoundingClientRect();
  const visibleBottom = visualViewport.offsetTop + visualViewport.height;
  const hiddenHeight = textareaRect.bottom + VIEWPORT_PADDING - visibleBottom;
  if (hiddenHeight <= 0) {
    return;
  }

  pageContent.scrollTop += hiddenHeight;
}
```

这段代码只处理输入框真正被遮挡的部分：

```text
需要滚动的距离 = 输入框底部 + 安全间距 - 可视区域底部
```

输入框没有被遮挡时，`hiddenHeight <= 0`，不会滚动页面。

### 4.4 为什么使用 `requestAnimationFrame`

`visualViewport.resize` 触发时，浏览器可能还在进行键盘动画和页面布局。如果立即读取元素位置，有机会读到上一帧的数据。

因此把位置计算安排到下一次浏览器绘制之前：

```js
visibilityFrameId = requestAnimationFrame(() => {
  visibilityFrameId = null;
  keepComposerVisible();
});
```

如果同一帧连续触发多次 `resize`，先取消旧任务，只保留最后一次计算：

```js
if (visibilityFrameId !== null) {
  cancelAnimationFrame(visibilityFrameId);
}
```

这样可以减少重复布局计算和无效滚动。

### 4.5 监听和清理

```js
function handleComposerFocus() {
  if (!window.visualViewport) {
    return;
  }

  window.visualViewport.addEventListener('resize', scheduleComposerVisibility);
  scheduleComposerVisibility();
}

function handleComposerBlur() {
  removeViewportListener();
}

onBeforeUnmount(removeViewportListener);
```

监听只在输入框聚焦期间存在：

- 减少无关页面变化带来的计算。
- 避免组件重复进入时绑定多个监听器。
- 组件卸载时清理尚未执行的动画帧和事件监听器。

## 5. Android 的 viewport 配置

文件：`public/index.html`

```html
<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,viewport-fit=cover,interactive-widget=resizes-content"
>
```

`interactive-widget=resizes-content` 表示软键盘等交互组件出现时，支持该配置的浏览器应缩小页面可用区域。

它主要帮助支持此能力的 Android Chrome/WebView。不能只依赖这项配置处理 iOS，因此代码仍然通过 `visualViewport` 判断实际遮挡情况。

## 6. 为什么只滚动 `.page-content`

当前页面结构中，`.page-content` 是实际滚动容器，底部导航与它是同级元素：

```text
.cloud-operation-page
├── .page-content
│   └── agent-panel
└── .bottom-navigation
```

如果直接调用：

```js
textarea.scrollIntoView();
```

浏览器可能同时滚动内部容器和页面根节点，在 iOS 上容易出现滚动距离过大、页面顶部被推出屏幕或底部出现空白。

因此当前实现只修改：

```js
pageContent.scrollTop += hiddenHeight;
```

滚动目标明确，影响范围也更小。

## 7. 方案边界

当前采用的是最小修改方案，不主动接管 Safari 的默认聚焦滚动。

需要注意：

- 不同 iOS 版本、Safari 和 WKWebView 对软键盘的处理并不完全一致。
- 第三方输入法的键盘高度和动画时间可能不同。
- 如果页面本身没有足够的可滚动空间，`scrollTop` 会受到最大滚动距离限制。
- `interactive-widget=resizes-content` 并不是所有 iOS 浏览器都支持。
- 真机测试仍然是移动端键盘适配的最终验收手段。

如果产品要求覆盖所有复杂场景，可以进一步设计键盘状态管理、动态滚动空间或固定输入栏方案，但这些方案会增加页面状态和滚动逻辑的复杂度，不属于当前最小修改范围。

## 8. 面试回答模板

可以这样回答：

> 移动端软键盘适配的核心问题是 Layout Viewport 和 Visual Viewport 不一致。尤其在 iOS Safari 中，键盘弹出后页面布局高度不一定变化，但用户真正能看到的 Visual Viewport 会缩小。
>
> 我的处理方式是使用原生 textarea，在聚焦期间监听 visualViewport 的 resize 事件。每次视口变化后，通过 requestAnimationFrame 等待浏览器完成当前帧布局，再比较 textarea 的 getBoundingClientRect().bottom 和 visualViewport 的可视底部。如果输入框被遮挡，只滚动页面实际的滚动容器，滚动距离等于实际遮挡高度，而不是写死键盘高度。
>
> 同时将输入框字体设置为 16px，避免 iOS 自动缩放；Android 端在 viewport 中增加 interactive-widget=resizes-content。输入框失焦或组件卸载时会清理监听器和动画帧，避免重复监听和内存泄漏。

## 9. 面试官可能继续追问的问题

### 9.1 为什么不写死键盘高度

不同设备、横竖屏、系统版本和输入法的键盘高度都可能不同。写死高度无法稳定适配，应该根据 `visualViewport` 的实际高度动态计算。

### 9.2 为什么不用 `window.innerHeight`

`window.innerHeight` 更接近布局视口或浏览器当前实现下的窗口高度，在部分 iOS 场景中不能准确代表键盘弹出后用户真正看到的区域。`visualViewport.height` 更适合描述当前可视区域。

### 9.3 为什么不用 `scrollIntoView`

`scrollIntoView` 的滚动目标和滚动范围由浏览器决定。页面存在嵌套滚动容器时，它可能滚动多个祖先，在 iOS 键盘场景下容易滚动过量。直接操作明确的 `.page-content` 更可控。

### 9.4 为什么字体必须是 16px

iOS Safari 为了提高小字号表单控件的可读性，可能在聚焦小于 `16px` 的输入框时自动缩放页面。将输入字号设置为至少 `16px` 可以避免这类自动放大。

### 9.5 为什么要清理监听器

组件重复进入、离开或输入框多次聚焦时，如果不清理监听器，可能产生重复回调、重复滚动和内存泄漏。未执行的 `requestAnimationFrame` 也应该取消。

## 10. 测试清单

### iPhone Safari/WKWebView

- 聚焦输入框，确认键盘弹出后输入框可见。
- 输入单行和多行中文。
- 收起键盘后再次聚焦，重复测试多次。
- 切换系统输入法和第三方输入法。
- 检查页面是否被滚动过量、顶部是否异常消失、底部是否出现空白。

### Android Chrome/WebView

- 检查键盘弹出后页面可用高度是否缩小。
- 检查输入框和当前输入内容是否被遮挡。
- 验证中文输入、换行和失焦后的滚动。

### 通用回归

- 相机图标和发送图标不覆盖文字。
- 底部导航可以正常点击。
- 其他共用 `agent-panel` 的路由没有布局回归。
- 控制台没有新增异常。
- 执行 `npm run build`。
- 执行 `git diff --check`。
