<template>
  <div class="card-layout" @click="onClick" :style="{ margin: `${margin}px` }">
    <div class="body">
      <div class="header" v-if="showHeader">
        <slot name="header" />
      </div>
      <div class="title" v-if="showTitle">
        <slot name="title">
          <div class="label-group row-center justify-content-center mt0 mb0">
            <span class="blue-line" v-if="showBlueLine"></span>
            <p class="label-text black small bold card-title">{{ title }}</p>
            <p class="sub-title label-text black small bold card-title" v-if="subTitle">{{ subTitle }}</p>
            <van-tag plain type="warning" class="kpi-icon mini ml6" v-if="showKpi">KPI</van-tag>
            <p class="help-icon ml6" v-if="showHelp" @click.stop="onShowHelp"></p>
          </div>
          <van-icon name="arrow" class="small" v-if="showNav" />
        </slot>
      </div>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cardLayout',
  props: {
    showBorder: {
      type: Boolean,
      default: true
    },
    showPadding: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    title: String,
    subTitle: String,
    showKpi: {
      type: Boolean,
      default: false
    },
    showHelp: {
      type: Boolean,
      default: true
    },
    showNav: {
      type: Boolean,
      default: true
    },
    helpTip: [String, Array],
    loading: {
      type: Boolean,
      default: true
    },
    showBlueLine: {
      type: Boolean,
      default: false,
    },
    margin: {
      type: [Number, String],
      default: 0
    },
  },
  data() {
    return {
      showAppend: false,
      showHeader: false
    }
  },
  mounted() {
    this.showAppend = !!this.$slots.append;
    this.showHeader = !!this.$slots.header;
  },
  methods: {
    onClick() {
      if (this.showNav) {
        this.$emit('navigate');
      }
    },
    onShowHelp() {
      if (this.showHelp) {
        this.$bus.emit('show-help-tip', {
          title: this.title,
          helpTip: this.helpTip
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.card-layout {
  position: relative;
  .body {
    position: relative;
    padding: 8px;
    background: #ffffff;
    border-radius: .21rem;
    overflow: hidden;
    margin-bottom: 8px;
    .header {
      margin-bottom: .32rem;
    }
    .title {
      display: flex !important;
      justify-content: space-between;
      align-items: center;
      line-height: .68rem;
      width: 100%;
      > *:first-child {
        flex: 0 0 auto;
      }
      .help-icon {
        display: inline-block;
        width: .37rem;
        height: .37rem;
        background: url(../../assets/svg/question.svg) no-repeat;
      }
    }
    .sub-title {
      font-size: 12px;
      margin-left: 4px;
    }
  }
}

.blue-line {
  display: inline-block;
  width: .08rem;
  height: .43rem;
  background: #5F7DE0;
  border-radius: .04rem;
  margin-right: .21rem;
  vertical-align: middle;
}
</style>