<template>
  <div class="sub-card" :class="{ clickable: showArrow }" @click="handleClick">
    <div class="sub-card-header" v-if="showTitle">
      <div class="title-wrapper">
        <van-icon :name="icon" class="title-icon" v-if="icon" />
        <span class="title-text">{{ title }}</span>
      </div>
      <van-icon name="arrow" class="arrow-icon" v-if="showArrow" />
    </div>
    <div class="sub-card-body" v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    background: {
      type: String,
      default: '#f7f8fa'
    },
    // 跳转目标，可以是路由 name 字符串或路由对象
    to: {
      type: [String, Object],
      default: ''
    }
  },
  methods: {
    handleClick() {
      if (!this.showArrow) return
      
      // 如果有 to 属性，执行路由跳转
      if (this.to) {
        if (typeof this.to === 'string') {
          this.$router.push({ name: this.to })
        } else {
          this.$router.push(this.to)
        }
      }
      
      // 始终触发 click 事件，让父组件可以监听
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.sub-card {
  background: #f7f8fa;
  border-radius: .21rem;
  padding: .43rem;
  transition: all 0.2s ease;
  
  &.clickable {
    cursor: pointer;
    
    &:active {
      background: #ebedf0;
      transform: scale(0.98);
    }
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .sub-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .32rem;
    
    .title-wrapper {
      display: flex;
      align-items: center;
      flex: 1;
      
      .title-icon {
        font-size: .48rem;
        color: #1989fa;
        margin-right: .21rem;
      }
      
      .title-text {
        font-size: .43rem;
        font-weight: 600;
        color: #252b3a;
      }
    }
    
    .arrow-icon {
      font-size: .37rem;
      color: #969aa3;
    }
  }
  
  .sub-card-body {
    // 内容区域样式
  }
}
</style>

