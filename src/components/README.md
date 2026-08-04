# 组件使用文档

## 📦 组件列表

### 1. CardLayout - 卡片布局组件（主卡片）

用于创建统一样式的主卡片容器，通常用作页面的主要内容区块。

**Props:**
- `showBorder` - 是否显示边框（默认：true）
- `showPadding` - 是否显示内边距（默认：true）
- `showTitle` - 是否显示标题（默认：true）
- `title` - 标题文字
- `showKpi` - 是否显示 KPI 标签（默认：false）
- `showHelp` - 是否显示帮助图标（默认：true）
- `showNav` - 是否显示导航箭头（默认：true）
- `showBlueLine` - 是否显示蓝色竖线（默认：false）
- `helpTip` - 帮助提示内容

**示例:**
```vue
<card-layout
  title="效率"
  :show-blue-line="true"
  :show-nav="false"
>
  <!-- 卡片内容，可以包含多个子卡片 -->
</card-layout>
```

---

### 2. SubCard - 子卡片组件

用于在主卡片（CardLayout）内创建子卡片，通常用于分组展示相关数据。

**Props:**
- `title` - 子卡片标题
- `icon` - 标题图标（Vant 图标名称）
- `showTitle` - 是否显示标题（默认：true）
- `showArrow` - 是否显示右侧箭头（默认：true）
- `background` - 背景颜色（默认：#f7f8fa）

**Events:**
- `click` - 点击子卡片时触发（仅当 showArrow 为 true 时）

**示例:**
```vue
<!-- 基础用法 -->
<sub-card
  title="IT设备"
  icon="desktop-o"
  @click="handleClick"
>
  <!-- 子卡片内容 -->
  <data-item :value="1524211" label="资产总数" unit="台" />
</sub-card>

<!-- 嵌套在主卡片中 -->
<card-layout title="效率" :show-blue-line="true">
  <sub-card title="IT设备" icon="desktop-o">
    <!-- 内容 -->
  </sub-card>
  <sub-card title="网络设备" icon="cluster-o">
    <!-- 内容 -->
  </sub-card>
</card-layout>
```

**特性:**
- ✅ 浅灰色背景，与主卡片区分
- ✅ 圆角边框，视觉柔和
- ✅ 点击反馈动画
- ✅ 支持图标和箭头
- ✅ 自动间距管理

---

### 3. DataItem - 数据项组件

用于展示单个数据指标，支持数值、标签、单位、趋势等。

**Props:**
- `value` - 数据值（必填）
- `label` - 标签文字（必填）
- `unit` - 单位（如：台、%、个）
- `icon` - 图标名称（Vant 图标）
- `trend` - 趋势值（如：+12.5%）
- `trendType` - 趋势类型：up、down、neutral（默认：up）
- `showTrend` - 是否显示趋势（默认：false）
- `valueColor` - 数值颜色（默认：#252b3a）
- `labelColor` - 标签颜色（默认：#969aa3）
- `layout` - 布局方式：vertical、horizontal（默认：vertical）
- `size` - 尺寸：small、medium、large（默认：medium）
- `format` - 是否格式化数字（默认：true）

**示例:**
```vue
<!-- 基础用法 -->
<data-item
  :value="1524211"
  label="资产总数"
  unit="台"
  icon="records"
  size="medium"
/>

<!-- 带趋势 -->
<data-item
  value="92.16"
  label="资产在线率"
  unit="%"
  trend="0.45%"
  :show-trend="true"
  trend-type="up"
  size="medium"
/>

<!-- 水平布局 -->
<data-item
  :value="12345"
  label="总订单数"
  unit="单"
  layout="horizontal"
  size="medium"
/>
```

---

### 4. StatsGrid - 统计网格组件

用于创建响应式的数据项网格布局。

**Props:**
- `columns` - 列数：1、2、3、4（默认：2）
- `gap` - 间距大小：small、medium、large（默认：medium）

**示例:**
```vue
<stats-grid :columns="2" gap="medium">
  <data-item :value="1524211" label="资产总数" unit="台" />
  <data-item :value="1021654" label="自服务器数量" unit="台" />
</stats-grid>
```

---

### 5. DividerLine - 分隔线组件

用于在内容之间添加分隔线。

**Props:**
- `type` - 线条类型：solid、dashed、dotted（默认：solid）
- `color` - 线条颜色（默认：#ebedf0）
- `spacing` - 上下间距：none、small、medium、large（默认：medium）
- `thickness` - 线条粗细（默认：1px）

**示例:**
```vue
<!-- 默认分隔线 -->
<divider-line spacing="medium" />

<!-- 自定义颜色和样式 -->
<divider-line type="dashed" color="#999" spacing="large" />
```

---

### 6. BackTop - 回到顶部组件

点击后平滑滚动到页面顶部，滚动到一定距离后才显示。

**Props:**
- `visibilityHeight` - 滚动超过多少像素后显示按钮（默认：200）
- `bottom` - 距离底部的距离（默认：100px）
- `iconSize` - 图标大小（默认：20px）
- `target` - 滚动容器的选择器，默认为 window

**Events:**
- `click` - 点击按钮时触发

**示例:**
```vue
<!-- 基础用法 -->
<back-top />

<!-- 自定义参数 -->
<back-top 
  :visibility-height="300" 
  bottom="120px"
  icon-size="24px"
/>

<!-- 指定滚动容器 -->
<back-top target=".scroll-container" />
```

**特性:**
- ✅ 平滑滚动动画（缓动函数）
- ✅ 淡入淡出过渡效果
- ✅ 点击反馈动画
- ✅ 响应式设计（rem 单位）
- ✅ 自动监听滚动事件

---

## 🎨 完整示例

```vue
<template>
  <card-layout
    title="IT设备"
    :show-blue-line="true"
    @navigate="handleNavigate('IT设备')"
  >
    <!-- 上半部分：2列网格 -->
    <stats-grid :columns="2" gap="medium">
      <data-item
        :value="1524211"
        label="资产总数"
        unit="台"
        icon="records"
        size="medium"
      />
      <data-item
        :value="1021654"
        label="自服务器数量"
        unit="台"
        icon="manager"
        size="medium"
      />
    </stats-grid>
    
    <!-- 分隔线 -->
    <divider-line spacing="medium" />
    
    <!-- 下半部分：单个数据项 -->
    <data-item
      value="92.16"
      label="资产在线率"
      unit="%"
      trend="0.45%"
      :show-trend="true"
      trend-type="up"
      size="medium"
    />
  </card-layout>
</template>

<script>
import CardLayout from '@/components/card-layout/index.vue'
import DataItem from '@/components/data-item/index.vue'
import StatsGrid from '@/components/stats-grid/index.vue'
import DividerLine from '@/components/divider-line/index.vue'

export default {
  components: {
    CardLayout,
    DataItem,
    StatsGrid,
    DividerLine
  },
  methods: {
    handleNavigate(name) {
      console.log('导航到:', name)
    }
  }
}
</script>
```

## 🎯 设计原则

1. **组件化** - 每个组件职责单一，可独立使用
2. **灵活性** - 提供丰富的 props 满足不同场景
3. **一致性** - 统一的设计风格和 API 设计
4. **响应式** - 支持移动端适配（基于 rem）
5. **可扩展** - 支持插槽和自定义样式

## 📱 移动端适配

所有组件都使用 rem 单位，配合 amfe-flexible 自动适配不同屏幕尺寸。
设计稿基准：375px

