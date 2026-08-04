<template>
  <div class="card-layout" @click="onClick">
    <div
      class="body"
      :style="{
        border: showBorder ? '1px solid #e5e6ea' : '1px solid #fff',
        padding: showPadding ? '.35rem' : '0'
      }"
    >
      <div class="header" v-if="showHeader">
        <slot name="header"></slot>
      </div>
      <div class="title" v-if="showTitle">
        <slot name="title">
          <div class="label-group row-center justify-content-center mt0 mb0">
            <span class="blue-line" v-if="showBlueLine"></span>
            <p class="label-text black small bold card-title">{{ title }}</p>
            <van-tag plain type="warning" class="kpi-icon mini ml6" v-if="showKpi">KPI</van-tag>
            <p class="help-icon ml6" v-if="showHelp" @click.stop="onShowHelp"></p>
          </div>
          <van-icon name="arrow" class="small" v-if="showNav"></van-icon>
        </slot>
      </div>
      <slot/>
    </div>
  </div>
</template>

<script>
import { timePanelSharedProps } from 'element-plus/es/components/time-picker/src/props/shared';

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
    showKpi: {
      type: Boolean,
      default: false
    },
    showHelp: {
      type: Boolean,
      default: true,
    },
    showNav: {
      type: Boolean,
      default: true,
    },
    showBlueLine: {
      type: Boolean,
      default: false
    },
    helpTip: [String, Array],
  },
  data() {
    return {
      showAppend: false,
      showHeader: false,
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
    padding: .35rem;
    background: #fff;
    border-radius: .21rem;
    overflow: hidden;
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
        background: url('../../assets/svg/question.svg') no-repeat;
      }
    }
  }
}

.label-group {
  margin: .16rem 0;
}

.row-center {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.justify-content-center {
  justify-content: center;
}

.mt0 {
  margin-top: 0;
}

.mb0 {
  margin-bottom: 0;
}

.label-text {
  position: rerlative;
  white-space: nowrap;
  color: #252b3a;
  display: inline-block;
}

.black {
  color: #252b3a;
}

.small {
  font-size: .37rem;
}

.bold {
  font-weight: 600;
}

.mini {
  font-size: .32rem;
  line-height: .4rem;
}

.ml6 {
  margin-left: .16rem;
}

.blue-line {
  display: inline-block;
  width: .08rem;
  height: .43rem;
  background: #1989fa;
  border-radius: .04rem;
  margin-right: .21rem;
  vertical-align: middle;
}
</style>
