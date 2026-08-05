<template>
  <nav class="bottom-navigation" aria-label="页面导航">
    <button
      class="nav-item"
      :class="{ active: active === 'resource' }"
      type="button"
      @click="emit('navigate', 'resource')"
    >
      <svg-icon class="nav-svg-icon" icon-name="resource" />
      <span>资源</span>
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
      <span>DC</span>
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
  position: fixed;
  z-index: 1000;
  right: 0;
  bottom: 0;
  left: 50%;
  display: grid;
  width: 100%;
  max-width: 500PX;
  min-height: 56px;
  grid-template-columns: 1fr 1.2fr 1fr;
  align-items: end;
  padding: 5px 18px calc(5px + env(safe-area-inset-bottom));
  border-top: 1PX solid #ebeaf1;
  background: rgba(255, 255, 255, .98);
  transform: translateX(-50%);
  box-shadow: 0 -3px 10px rgba(39, 29, 78, .07);
}

.nav-item,
.ai-button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #716b85;
  background: transparent;
  cursor: pointer;
}

.nav-item {
  flex-direction: column;
  gap: 1px;
  font-size: 12px;
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
  color: #5c4bc3;
}

.ai-button {
  width: 66px;
  height: 66px;
  flex-direction: column;
  justify-self: center;
  margin-bottom: 3px;
  border: 3px solid #eeefff;
  border-radius: 50%;
  color: #4e55cc;
  background: #fff;
  box-shadow: 0 -2px 9px rgba(76, 79, 191, .22);
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
