<template>
  <div class="divider-line" :class="[type, `spacing-${spacing}`]" :style="customStyle"></div>
</template>

<script>
export default {
  name: 'DividerLine',
  props: {
    type: {
      type: String,
      default: 'solid', // solid, dashed, dotted
      validator: (value) => ['solid', 'dashed', 'dotted'].includes(value)
    },
    color: {
      type: String,
      default: '#ebedf0'
    },
    spacing: {
      type: String,
      default: 'medium', // small, medium, large
      validator: (value) => ['small', 'medium', 'large', 'none'].includes(value)
    },
    thickness: {
      type: String,
      default: '1px'
    }
  },
  computed: {
    customStyle() {
      return {
        borderTopColor: this.color,
        borderTopWidth: this.thickness,
        borderTopStyle: this.type
      }
    }
  }
}
</script>

<style lang="less" scoped>
.divider-line {
  width: 100%;
  border-top: 1px solid #ebedf0;
  
  &.spacing-none {
    margin: 0;
  }
  
  &.spacing-small {
    margin: .27rem 0;
  }
  
  &.spacing-medium {
    margin: .43rem 0;
  }
  
  &.spacing-large {
    margin: .64rem 0;
  }
}
</style>

