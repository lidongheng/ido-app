<template>
  <nav class="bottom-navigation" aria-label="页面导航">
    <button
      class="nav-item"
      :class="{ active: active === 'resource' }"
      type="button"
      @click="emit('navigate', 'resource')"
    >
      <van-icon name="cluster-o" />
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
  min-height: 1.48rem;
  grid-template-columns: 1fr 1.2fr 1fr;
  align-items: end;
  padding: .13rem .48rem calc(.13rem + env(safe-area-inset-bottom));
  border-top: 1PX solid #ebeaf1;
  background: rgba(255, 255, 255, .98);
  transform: translateX(-50%);
  box-shadow: 0 -.08rem .27rem rgba(39, 29, 78, .07);
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
  gap: .03rem;
  font-size: .32rem;
}

.nav-item .van-icon {
  font-size: .61rem;
}

.nav-item.active {
  color: #5c4bc3;
}

.ai-button {
  width: 1.75rem;
  height: 1.75rem;
  flex-direction: column;
  justify-self: center;
  margin-bottom: .08rem;
  border: .08rem solid #eeefff;
  border-radius: 50%;
  color: #4e55cc;
  background: #fff;
  box-shadow: 0 -.05rem .24rem rgba(76, 79, 191, .22);
}

.ai-symbol {
  height: .75rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: .72rem;
  transform: rotate(-12deg);
}

.ai-label {
  margin-top: .03rem;
  font-size: .27rem;
  font-weight: 600;
}
</style>
