<template>
  <div class="metric-card" :class="{ compact, 'has-title': title }">
    <div class="metric-card-box">
      <div v-if="title" class="card-header" :class="{ expandable }">
        <span class="header-left">
          <SvgIcon
            v-if="iconName"
            :icon-name="iconName"
            class="svg-icon-class"
          ></SvgIcon>
          <span class="card-title">{{ title }}</span>
        </span>
        <span @click="toggle" v-if="expandable" class="expand-label">
          {{ expanded ? '收起' : '展开' }}
          <van-icon :name="expanded ? 'arrow-up' : 'arrow-down'" />
        </span>
      </div>

      <div class="card-body">
        <template v-for="(metric, index) in metrics" :key="metric.label">
          <metric-item
            class="metric-item"
            :metric="metric"
            :compact="compact"
            :loading="loading"
            :showRatio="showRatio"
          />
          <div class="line" v-if="index !== metrics.length - 1"></div>
        </template>
      </div>
    </div>
    <div v-if="expanded && $slots.default" class="card-details">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SvgIcon from './SvgIcon.vue';
import MetricItem from './MetricItem.vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  iconName: {
    type: String,
    default: ''
  },
  metrics: {
    type: Array,
    required: true
  },
  expandable: {
    type: Boolean,
    default: false
  },
  defaultExpanded: {
    type: Boolean,
    default: false
  },
  compact: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showRatio: {
    type: Boolean,
    default: false,
  },
});

const expanded = ref(props.defaultExpanded);

function toggle() {
  if (!props.expandable) {
    return;
  }

  expanded.value = !expanded.value;
}
</script>

<style lang="less" scoped>
.svg-icon-class {
  height: 14px;
  width: 14px;
}

.metric-card {
  background: #fff;
}

.metric-card-box {
  border: 1.6px solid rgba(229, 237, 252, 1);
  border-radius: 8px;
  overflow: hidden;
}

.card-header {
  display: flex;
  width: 100%;
  height: 20px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  color: #28204f;
  background: rgba(205, 216, 255, 1);
  text-align: left;
}

.card-header.expandable {
  cursor: pointer;
}

.header-left {
  display: flex;
  gap: 2px;
}

.card-title {
  color: rgba(37, 43, 58, 1);
  font-family: 'Microsoft YaHei';
  font-style: Bold;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: left;
}

.card-title-icon {
  flex-shrink: 0;
  margin-right: 0.13rem;
  color: #596fd7;
  font-size: 0.43rem;
}

.expand-label {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.05rem;
  color: #7176ae;
  font-size: 0.31rem;
  font-weight: 400;
}

.card-body {
  padding: 8px 10px;
  display: flex;
  gap: 8px;
  // justify-content: space-between;
}

.metric-item {
  flex: 1;
}

.line {
  width: 1px;
  border-right: 1px dashed #e5e6ee;
  margin: 4px 0px;
}

.compact .card-body {
  padding-top: 0.24rem;
  padding-bottom: 0.27rem;
}

.compact .card-header {
  background: rgba(229, 237, 252, 1);
}
</style>
