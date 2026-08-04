<template>
  <span class="ratio-arrow-wrapper" v-if="hasValue">
    <span
      class="arrow-icon"
      :style="{ color: arrowColor }"
      v-if="showArrow"
    >{{ arrowIcon }}</span>
    <span class="arrow-value">{{ displayValue }}</span>
    <span class="arrow-unit" v-if="unit && value !== '--'">{{ unit }}</span>
  </span>
</template>

<script>
/**
 * RatioArrow - 环比箭头组件
 * 
 * 支持两种颜色模式：
 * - normal（正常）: 上升红色 ↑，下降绿色 ↓（用于成本类指标，上升是坏事）
 * - reverse（反转）: 上升绿色 ↑，下降红色 ↓（用于效率/收益类指标，上升是好事）
 * 
 * @example
 * <!-- 百分比单位 -->
 * <ratio-arrow :value="5.2" unit="%" />
 * 
 * <!-- 天数单位 -->
 * <ratio-arrow :value="-3" unit="天" />
 * 
 * <!-- 无单位 -->
 * <ratio-arrow :value="2.5" unit="" />
 */
export default {
  name: 'RatioArrow',
  props: {
    // 环比值
    value: {
      type: [String, Number],
      default: ''
    },
    // 颜色模式：normal=上升红下降绿, reverse=上升绿下降红
    colorMode: {
      type: String,
      default: 'normal',
      validator: (v) => ['normal', 'reverse'].includes(v)
    },
    // 单位（如 %、天、元 等），空字符串表示不显示单位
    unit: {
      type: String,
      default: '%'
    }
  },
  computed: {
    // 是否有有效值
    hasValue() {
      return this.value !== '' && this.value !== null && this.value !== undefined
    },
    // 是否显示箭头（值为 0、'--' 或空时不显示箭头）
    showArrow() {
      return this.value !== 0 && this.value !== '--' && this.value !== ''
    },
    // 是否为正值
    isPositive() {
      return Number(this.value) > 0
    },
    // 箭头图标
    arrowIcon() {
      return this.isPositive ? '🡅 ' : '🡇 '
    },
    // 箭头颜色
    arrowColor() {
      if (this.colorMode === 'reverse') {
        // 反转模式：上升绿色，下降红色
        return this.isPositive ? '#07c160' : '#ee0a24'
      }
      // 正常模式：上升红色，下降绿色
      return this.isPositive ? '#ee0a24' : '#07c160'
    },
    // 显示的值（取绝对值）
    displayValue() {
      if (this.value === '--') return '--'
      const num = Number(this.value)
      if (Number.isNaN(num)) return this.value
      return Math.abs(num)
    }
  }
}
</script>

<style lang="less" scoped>
.ratio-arrow-wrapper {
  display: inline-flex;
  align-items: center;
  font-size: .32rem;
  color: #666;
  
  .arrow-icon {
    font-size: inherit;
  }
  
  .arrow-value {
    font-size: inherit;
    color: inherit;
  }
  
  .arrow-unit {
    font-size: inherit;
    color: inherit;
  }
}
</style>
