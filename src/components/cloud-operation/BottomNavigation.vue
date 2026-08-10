<template>
  <nav class="bottom-navigation" aria-label="页面导航">
    <button
      class="nav-item"
      :class="{ active: active === 'resource' }"
      type="button"
      @click="emit('navigate', 'resource')"
    >
      <svg-icon class="nav-svg-icon" icon-name="resource" />
      <p class="nav-item-text">资源</p>
    </button>

    <button class="ai-button" type="button" aria-label="AI助手" @click="emit('ai-click')">
      <span class="ai-symbol">∞</span>
      <span class="ai-label">AI助手</span>
    </button>

    <button
      class="nav-item"
      :class="{ active: active === 'dc' }"
      type="button"
      @click="emit('navigate', 'dc')"
    >
      <van-icon name="wap-home-o" />
      <p class="nav-item-text">DC</p>
    </button>
  </nav>
</template>

<script setup>
import '@/icons/resource.svg'
import SvgIcon from './SvgIcon.vue'

defineProps({
  active: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['navigate', 'ai-click'])
</script>

<style lang="less" scoped>
.bottom-navigation {
  /* 建立独立层叠上下文，避免滚动内容在安卓 WebView 中覆盖导航点击层。 */
  position: relative;
  z-index: 10;
  display: grid;
  width: 100%;
  max-width: 500PX;
  height: 54px;
  flex-shrink: 0;
  grid-template-columns: 1fr 1.2fr 1fr;
  align-items: stretch;
}

.bottom-navigation::before {
  position: absolute;
  z-index: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 76px;
  background-image: url('@/assets/svg/bottom-navigation-bg.svg');
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 100% 100%;
  content: '';
  pointer-events: none;
}

.nav-item,
.ai-button {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #716b85;
  background: transparent;
  cursor: pointer;
}

.nav-item {
  height: 54px;
  flex-direction: column;
  gap: 1px;
  .nav-item-text {
    font-size: 12px;
    line-height: 16px;
  }
}

/* AI 按钮脱离 Grid 后，明确固定左右导航项所在列。 */
.nav-item:first-child {
  grid-column: 1;
}

.nav-item:last-child {
  grid-column: 3;
}

.nav-item .van-icon {
  font-size: 23px;
}

.nav-item .nav-svg-icon {
  width: 23px;
  min-width: 23px;
  height: 23px;
  min-height: 23px;
}

.nav-item.active {
  color: rgba(94, 124, 224, 1);
}

.ai-button {
  position: absolute;
  right: auto;
  bottom: 3px;
  left: 50%;
  width: 66px;
  height: 66px;
  flex-direction: column;
  align-self: end;
  border: 3px solid #eeefff;
  border-radius: 50%;
  color: #4e55cc;
  background: #fff;
  box-shadow: 0 -2px 9px rgba(76, 79, 191, .22);
  transform: translateX(-50%);
}

.ai-symbol {
  height: 28px;
  font-size: 38px;
  font-weight: 500;
  line-height: 27px;
  transform: rotate(-12deg);
}

.ai-label {
  margin-top: 1px;
  font-size: 10px;
  font-weight: 600;
}
</style>
