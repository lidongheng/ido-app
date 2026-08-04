<template>
  <div class="data-item" :class="[layout, size, { 'with-divider': showRightDivider }]">
    <div class="data-value-wrapper">
      <!-- 状态指示点（根据单位成本环比显示不同颜色） -->
      <span class="status-dot" :class="statusDot" v-if="statusDot"></span>
      <span class="data-value" :style="{ color: valueColor }">{{ formattedValue }}</span>
      <span class="data-unit" v-if="unit">{{ unit }}</span>
      <span v-if="challengeStatus" class="status" :class="achievementStatus">{{ statusText }}</span>
      <!-- 环比变化（使用抽象的 RatioArrow 模块） -->
      <span class="ratio-arrow" v-if="showTrend && (trend || trend === 0)">
        <ratio-arrow
          :value="trend"
          :color-mode="trendColorMode"
          :unit="trendUnit"
        />
      </span>
    </div>
    <div class="data-label" :style="{ color: labelColor }">
      <van-icon :name="icon" v-if="icon" class="label-icon" />
      <span>{{ label }}</span>
      <!-- 环比显示区域（使用抽象的 RatioArrow 模块） -->
      <span class="chain-ratio" v-if="showChainRatio && (chainRatio || chainRatio === 0)">
        <ratio-arrow
          :value="chainRatio"
          :color-mode="chainRatioColorMode"
          :unit="chainRatioUnit"
        />
      </span>
    </div>
  </div>
</template>

<script>
import RatioArrow from './ratio-arrow.vue'

export default {
  name: 'DataItem',
  components: {
    RatioArrow
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    trend: {
      type: [String, Number],
      default: ''
    },
    // trend 的颜色模式：normal=上升红下降绿, reverse=上升绿下降红
    trendColorMode: {
      type: String,
      default: 'normal',
      validator: (value) => ['normal', 'reverse'].includes(value)
    },
    // trend 的单位（如 %、天、元），空字符串不显示单位
    trendUnit: {
      type: String,
      default: '%'
    },
    showTrend: {
      type: Boolean,
      default: false
    },
    valueColor: {
      type: String,
      default: '#252b3a'
    },
    labelColor: {
      type: String,
      default: '#969aa3'
    },
    layout: {
      type: String,
      default: 'vertical', // vertical, horizontal
      validator: (value) => ['vertical', 'horizontal'].includes(value)
    },
    size: {
      type: String,
      default: 'medium', // small, medium, large
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    format: {
      type: Boolean,
      default: true
    },
    // 状态指示点：green(≤0), orange(0~10%), red(>10%), 空字符串不显示
    statusDot: {
      type: String,
      default: '',
      validator: (value) => ['', 'green', 'orange', 'red'].includes(value)
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    challengeStatus: {
      type: Boolean,
      default: false
    },
    chainRatio: {
      type: [String, Number],
      default: ''
    },
    // chainRatio 的颜色模式：normal=上升红下降绿, reverse=上升绿下降红
    chainRatioColorMode: {
      type: String,
      default: 'normal',
      validator: (value) => ['normal', 'reverse'].includes(value)
    },
    // chainRatio 的单位（如 %、天、元），空字符串不显示单位
    chainRatioUnit: {
      type: String,
      default: '%'
    },
    showChainRatio: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: ''
    },
    // 是否显示右侧虚线分隔符
    showRightDivider: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    formattedValue() {
      if (!this.format) return this.value;
      
      // 先检查 null、undefined 或空字符串
      if (this.value === null || this.value === undefined || this.value === '') {
        return this.value;
      }
      
      const num = Number(this.value);
      // 使用 Number.isNaN 更严格，不会进行类型转换
      // Number.isNaN(null) 返回 false，但上面已经处理了 null
      if (Number.isNaN(num)) return this.value;
      
      // 格式化数字，添加千位分隔符
      return num.toLocaleString('zh-CN');
    }
  }
}
</script>

<style lang="less" scoped>
.data-item {
  display: flex;
  position: relative;
  
  &.vertical {
    flex-direction: column;
    align-items: flex-start;
  }
  
  &.horizontal {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  // 右侧虚线分隔符
  &.with-divider {
    padding-right: .32rem;
    
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 80%;
      border-right: 1px dashed #e5e6ea;
    }
  }
  
  .data-value-wrapper {
    display: flex;
    align-items: baseline;
    margin-bottom: .16rem;
    
    // 状态指示点样式
    .status-dot {
      width: .21rem;
      height: .21rem;
      border-radius: 50%;
      margin-right: .16rem;
      flex-shrink: 0;
      align-self: center;
      
      &.green {
        background: #07c160;
      }
      
      &.orange {
        background: #ff976a;
      }
      
      &.red {
        background: #ee0a24;
      }
    }
    
    .data-value {
      font-weight: 600;
      line-height: 1.2;
    }
    
    .data-unit {
      margin-left: .11rem;
      color: #969aa3;
      font-size: .32rem;
    }
    
    // 环比箭头样式
    .ratio-arrow {
      display: inline-flex;
      align-items: center;
      margin-left: .11rem;
      font-size: .32rem;
      font-weight: normal;
    }
  }
  
  .data-label {
    display: flex;
    align-items: center;
    font-size: .32rem;
    line-height: 1.4;
    
    .label-icon {
      margin-right: .11rem;
      font-size: .37rem;
    }
    
    .chain-ratio {
      margin-left: .16rem;
      font-size: .32rem;
    }
  }
  
  
  // 尺寸变体
  &.small {
    .data-value {
      font-size: .43rem;
    }
    .data-label {
      font-size: .29rem;
    }
  }
  
  &.medium {
    .data-value {
      font-size: .53rem;
    }
    .data-label {
      font-size: .32rem;
    }
  }
  
  &.large {
    .data-value {
      font-size: .75rem;
    }
    .data-label {
      font-size: .37rem;
    }
  }
  
  &.horizontal {
    .data-value-wrapper {
      margin-bottom: 0;
    }
  }
}
</style>

