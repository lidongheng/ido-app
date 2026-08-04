<template>
  <transition name="fade">
    <div 
      class="back-top" 
      v-show="visible"
      @click="scrollToTop"
      :style="{ bottom: bottomOffset }"
    >
      <van-icon name="back-top" :size="iconSize" />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BackTop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 200 // 滚动超过200px后显示按钮
    },
    bottom: {
      type: String,
      default: '100px' // 距离底部的距离
    },
    iconSize: {
      type: String,
      default: '20px'
    },
    target: {
      type: String,
      default: '' // 滚动容器的选择器，默认为window
    }
  },
  data() {
    return {
      visible: false,
      scrollContainer: null
    }
  },
  computed: {
    bottomOffset() {
      return this.bottom
    }
  },
  mounted() {
    this.init()
  },
  beforeUnmount() {
    this.removeScrollListener()
  },
  methods: {
    init() {
      this.scrollContainer = this.target 
        ? document.querySelector(this.target)
        : window
      
      if (this.scrollContainer) {
        this.addScrollListener()
      }
    },
    addScrollListener() {
      this.scrollContainer.addEventListener('scroll', this.handleScroll)
    },
    removeScrollListener() {
      if (this.scrollContainer) {
        this.scrollContainer.removeEventListener('scroll', this.handleScroll)
      }
    },
    handleScroll() {
      const scrollTop = this.scrollContainer === window
        ? window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        : this.scrollContainer.scrollTop
      
      this.visible = scrollTop >= this.visibilityHeight
    },
    scrollToTop() {
      const start = this.scrollContainer === window
        ? window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        : this.scrollContainer.scrollTop
      
      const duration = 300 // 动画持续时间（毫秒）
      const startTime = Date.now()
      
      const scroll = () => {
        const currentTime = Date.now()
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // 使用缓动函数
        const easeInOutCubic = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2
        
        const scrollTop = start * (1 - easeInOutCubic)
        
        if (this.scrollContainer === window) {
          window.scrollTo(0, scrollTop)
        } else {
          this.scrollContainer.scrollTop = scrollTop
        }
        
        if (progress < 1) {
          requestAnimationFrame(scroll)
        }
      }
      
      requestAnimationFrame(scroll)
      
      // 触发事件
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.back-top {
  position: fixed;
  right: .43rem;
  width: 1.07rem;
  height: 1.07rem;
  background: #1989fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 .08rem .27rem rgba(25, 137, 250, 0.3);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.9);
    box-shadow: 0 .05rem .16rem rgba(25, 137, 250, 0.4);
  }
  
  .van-icon {
    color: #fff;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>

