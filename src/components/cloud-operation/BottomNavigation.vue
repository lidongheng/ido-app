<template>
  <nav class="bottom-navigation" aria-label="页面导航">
    <button
      class="nav-item common-compute-item"
      :class="{ active: active === 'commonCompute' }"
      type="button"
      @click="emit('navigate', 'commonCompute')"
    >
      <svg-icon
        class="nav-svg-icon"
        icon-name="general-icon-1"
      />
      <p class="nav-item-text">通算</p>
    </button>

    <button
      class="nav-item ai-compute-item"
      :class="{ active: active === 'aiCompute' }"
      type="button"
      @click="emit('navigate', 'aiCompute')"
    >
      <svg-icon
        class="nav-svg-icon"
        icon-name="ai-icon-1"
      />
      <p class="nav-item-text">智算</p>
    </button>

    <button
      class="ai-button"
      type="button"
      aria-label="AI助手"
      @click="emit('ai-click')"
    >
      <img class="ai-symbol" src="@/assets/cloud-operation/AIlogo.gif" alt="" />
      <span class="ai-label">AI助手</span>
    </button>

    <button
      class="nav-item region-item"
      :class="{ active: active === 'Region' }"
      type="button"
      @click="emit('navigate', 'Region')"
    >
      <SvgIcon
        class="nav-svg-icon"
        :icon-name="`resource${active === 'Region' ? '_active' : ''}`"
      />
      <p class="nav-item-text">Region</p>
    </button>

    <button
      class="nav-item dc-item"
      :class="{ active: active === 'dc' }"
      type="button"
      @click="emit('navigate', 'dc')"
    >
      <SvgIcon
        class="nav-svg-icon"
        :icon-name="`dc${active === 'dc' ? '_active' : ''}`"
      />
      <p class="nav-item-text">DC</p>
    </button>
  </nav>
</template>

<script setup>
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
  max-width: 500px;
  height: 54px;
  flex-shrink: 0;
  grid-template-columns: repeat(5, 1fr);
  align-items: stretch;
}

.bottom-navigation::before {
  position: absolute;
  z-index: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 66px;
  background-image: url('@/assets/svg/bottom-navigation-bg.svg');
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 105% 104%;
  content: '';
  pointer-events: none;
  transform: translateY(6%);
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
.common-compute-item {
  grid-column: 1;
}

.ai-compute-item {
  grid-column: 2;
}

.region-item {
  grid-column: 4;
}

.dc-item {
  grid-column: 5;
}

.nav-item .van-icon {
  font-size: 23px;
}

.nav-item .nav-svg-icon {
  width: 18.51px;
  height: 20px;
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
    justify-content: end;
    border: 3px solid transparent;
    border-radius: 50%;
    color: #4e55cc;
    background: linear-gradient(#fff, #fff) padding-box,
                linear-gradient(90deg, #5e7ce0, #7693f5, #a78bfa, #7693f5, #5e7ce0)
                border-box;
    background-size: 100% 100%, 300% 100%;
    animation: border-flow 2s linear infinite;
    box-shadow: 0 -2px 9px rgba(76, 79, 191, 0.22);
    transform: translate(-54%, -24%);
    padding-bottom: 4px;
}

.ai-symbol {
    width: 1.4rem;
    position: absolute;
    top: 6%;
}

.ai-label {
    margin-top: 0.03rem;
    font-size: 0.3rem;
    font-weight: 600;
}

@keyframes border-flow {
    0% {
        background-position: 0 0, 0 50%;
    }
    100% {
        background-position: 0 0, 100% 50%;
    }
}
</style>
