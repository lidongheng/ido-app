<template>
  <div class="split-panel-container" :class="{ 'split-mode': computedSplitMode }">
    <!-- 主内容区 -->
    <div class="split-panel-main" :style="mainStyle">
      <slot name="main">
        <slot></slot>
      </slot>
    </div>

    <!-- 侧边详情区 -->
    <div v-if="hasSideSlot && computedSplitMode" class="split-panel-side" :style="sideStyle">
      <div class="title">
        <div class="blue-dot"></div>
        {{ title }}
      </div>
      <slot name="side"></slot>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
  useSlots,
  watch,
} from 'vue';
import { useRouter } from 'vue-router';
import { isFoldScreenExpanded } from '@/composables/useFoldableScreen';

defineOptions({
  name: 'SplitPanel',
});

const props = defineProps({
  // 主内容区宽度（可配置）
  mainWidth: {
    type: String,
    default: '50%',
  },
  // 是否强制分屏模式
  forceSplit: {
    type: Boolean,
    default: false,
  },
  // 侧边区域最小宽度
  sideMinWidth: {
    type: String,
    default: '40%',
  },
  // 标题
  title: {
    type: String,
    default: '',
  },
  // 外部传入的展开状态（可选），如果有则优先使用
  isExpanded: {
    type: Boolean,
    default: undefined,
  },
  // 是否监听屏幕变化（用于合屏/展开时自动更新）
  watchResize: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();
const hasSideSlot = computed(() => !!slots.side);

// 内部展开状态（用于响应式更新）
const internalExpanded = ref(isFoldScreenExpanded());

// 计算属性：优先使用 props.isExpanded，否则使用内部状态
// 当 props.isExpanded 变化时，这个 computed 会自动重新计算
const computedSplitMode = computed(() => {
  // forceSplit 强制分屏
  if (props.forceSplit) return hasSideSlot.value;

  // 没有 side slot 不分屏
  if (!hasSideSlot.value) return false;

  // 如果传入了 isExpanded，优先使用（props.isExpanded 是响应式的）
  if (props.isExpanded !== undefined) return props.isExpanded;

  // 否则使用内部检测状态
  return internalExpanded.value;
});

// 暴露更新方法，让父组件可以触发 isExpanded 更新
const updateExpanded = (value) => {
  internalExpanded.value = value;
};

defineExpose({ updateExpanded });

// 定义 emit，当需要父组件关闭分屏时触发
const emit = defineEmits(['close-side']);

const mainStyle = computed(() => (computedSplitMode.value ? { width: props.mainWidth } : {}));
const sideStyle = computed(() => (computedSplitMode.value ? { minWidth: props.sideMinWidth } : {}));

// 监听屏幕宽度变化，用于合屏/展开时自动更新
const handleResize = () => {
  const newExpanded = isFoldScreenExpanded();
  if (internalExpanded.value !== newExpanded) {
    internalExpanded.value = newExpanded;
  }
};

// 获取 Vue Router 实例
const router = useRouter();

// 直接调用原生 History 方法，避免缓存页面互相包装 back。
const originalBack = (...args) => History.prototype.back.apply(window.history, args);

const interceptedBack = function (...args) {
  // 折叠屏详情打开时，返回操作只关闭右侧详情，不离开当前页面。
  if (computedSplitMode.value) {
    if (props.isExpanded !== undefined) {
      emit('close-side');
    } else {
      updateExpanded(false);
    }
    return;
  }
  return originalBack(...args);
};

const restoreRootFontSize = () => {
  // 分屏关闭后恢复整屏宽度对应的 rem，避免后续页面保持半屏字号。
  const docEl = document.documentElement;
  const width = Math.min(docEl.clientWidth, 500);
  docEl.style.fontSize = `${width / 10}px`;
};

let removeRouterGuard = null;
let stopExpandedWatch = null;

onMounted(() => {
  if (props.watchResize) {
    window.addEventListener('resize', handleResize);
  }

  // 拦截 history.back() 方法，当分屏打开时关闭分屏，否则正常返回
  window.history.back = interceptedBack;

  // 添加 Vue Router 全局守卫，路由变化时关闭分屏
  removeRouterGuard = router.beforeEach((to, from, next) => {
    if (computedSplitMode.value) {
      // 关闭分屏
      if (props.isExpanded !== undefined) {
        emit('close-side');
      } else {
        updateExpanded(false);
      }
    }
    // 正常导航
    next();
  });

  stopExpandedWatch = watch(
    () => props.isExpanded,
    (isOpen) => {
      const docEl = document.documentElement;
      if (isOpen) {
        const width = Math.min(docEl.clientWidth / 2, 500);
        const rem = width / 10;
        docEl.style.fontSize = rem + 'px';
      } else {
        const width = Math.min(docEl.clientWidth, 500);
        const rem = width / 10;
        docEl.style.fontSize = rem + 'px';
      }
    }
  );
});

onActivated(() => {
  // keep-alive 页面重新激活时，只允许当前分屏实例接管返回操作。
  window.history.back = interceptedBack;
});

onDeactivated(() => {
  // 修复折叠屏页面缓存后仍拦截其他页面返回操作的问题。
  if (window.history.back === interceptedBack) {
    window.history.back = originalBack;
  }
  restoreRootFontSize();
});

onUnmounted(() => {
  if (props.watchResize) {
    window.removeEventListener('resize', handleResize);
  }
  // 恢复原始的 back 方法
  if (window.history.back === interceptedBack) {
    window.history.back = originalBack;
  }
  if (removeRouterGuard) {
    removeRouterGuard();
  }
  if (stopExpandedWatch) {
    stopExpandedWatch();
  }
  // 页面卸载后恢复全屏宽度对应的根字号。
  restoreRootFontSize();
});
</script>

<style lang="less" scoped>
.split-panel-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &.split-mode {
    flex-direction: row;

    .split-panel-main {
      flex-shrink: 0;
    }

    .split-panel-side {
      flex: 1;
      min-width: 0;
      border-left: 1px solid #e8ebf3;
      overflow: auto;
      .blue-dot {
        width: 8px;
        height: 8px;
        background: #5f7de0;
        border-radius: 4px;
      }
      .title {
        width: 100%;
        font-size: 12px;
        font-weight: bold;
        display: flex;
        align-items: center;
        background-color: #fff;
        height: 32px;
        border-radius: 8px 0 0 8px;
        padding-left: 12px;
        gap: 6px;
      }
    }
  }
}

.split-panel-main {
  flex: 1;
  min-width: 0;
  overflow: auto;
}
</style>
