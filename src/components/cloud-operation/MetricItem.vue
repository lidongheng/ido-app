<template>
  <div class="metric-content" :class="{ compact }">
    <div
      class="metric-label flex-center"
      :class="{ 'separate-icon-row': separateIconRow }"
    >
      <SvgIcon
        v-if="metric.iconName"
        :icon-name="metric.iconName"
        class="svg-icon-class"
      ></SvgIcon>
      <van-icon v-else-if="metric.icon" :name="metric.icon" class="van-icon-class" />
      <span>{{ metric.label }}</span>
      <van-popover
        v-if="metric.help && metric.helpText"
        v-model:show="helpVisible"
        placement="bottom"
      >
        <div class="metric-help-content">{{ metric.helpText }}</div>
        <template #reference>
          <van-icon class="help-icon" name="question-o" />
        </template>
      </van-popover>
      <van-icon v-else-if="metric.help" class="help-icon" name="question-o" />
    </div>
    <skeleton
      :loading="loading"
      :width="60"
      :height="compact ? 20 : 24"
      :style="{
        marginTop: loading ? '6px' : '0px',
      }"
    >
      <div class="metric-value-row">
        <span class="metric-value">{{ formattedValue }}</span>
        <span class="metric-unit">{{ metric.unit }}</span>
      </div>
    </skeleton>
    <div v-if="metric.trend" class="metric-trend">
      <span>{{ metric.trend.label }}</span>
      <trend-value
        :value="metric.trend.value"
        :direction="metric.trend.direction"
        :unit="metric.trend.unit"
      />
    </div>
    <div v-if="metric.trends" class="metric-trends-group">
      <div v-for="trend in metric.trends" :key="trend.label" class="metric-trend">
        <span>{{ trend.label }}</span>
        <trend-value
          :value="trend.value"
          :direction="trend.direction"
          :unit="trend.unit"
        />
      </div>
    </div>
    <div v-if="metric.details" class="metric-details">
      <div v-for="detail in metric.details" :key="detail.label" class="detail-row">
        <span class="detail-label">
          {{ detail.label }}
          <van-icon v-if="detail.help !== false" class="help-icon-small" name="question-o" />
        </span>
        <strong :class="{ 'trend-up': detail.highlight === 'up', 'trend-down': detail.highlight === 'down' }">
          {{ detail.value }}
        </strong>
      </div>
    </div>
    <skeleton
      v-if="showRatio"
      :loading="loading"
      :width="90"
      :height="16"
      :style="{
        marginTop: loading ? '3px' : '0px',
      }"
    >
      <div class="metric-ratio">
        <span class="ratio-label">较上月</span>
        <span class="ratio-value-row">
          <span :class="['ratio-arrow', textClass]">{{ ratioArrow }}</span>
          <span :class="['ratio-value', textClass]">{{
            formattedRatioValue
          }}</span>
        </span>
        <span class="ratio-unit">{{ metric.unit }}</span>
      </div>
    </skeleton>
    <div class="list" v-if="showList">
      <div class="list-item" v-for="item in metric.list" :key="item.label">
        <div class="ratio-label">
          {{ item.label }}
          <span v-if="item.tips" class="question">
            <SvgIcon icon-name="question" :useStyle="{ width: 12, height: 12 }" />
          </span>
        </div>
        <div class="item-right">
          <div class="item-value">{{ item.value }}</div>
          <div class="item-unit">{{ item.unit }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import SvgIcon from '@/components/cloud-operation/SvgIcon.vue';
import TrendValue from '@/components/ai-compute/TrendValue.vue';
import skeleton from '@/components/skeleton/index.vue';
import { useMetricHelp } from './useMetricHelp.js';

const props = defineProps({
  metric: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  upGreen: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: true,
  },
  failed: {
    type: Boolean,
    required: true,
  },
  showRatio: {
    type: Boolean,
    default: false,
  },
  showList: {
    type: Boolean,
    default: false,
  },
  separateIconRow: {
    type: Boolean,
    default: false,
  },
});

const { helpVisible } = useMetricHelp();

const formattedValue = computed(() => {
  if (props.failed) {
    return '--';
  }

  if (typeof props.metric.value === 'number') {
    return props.metric.value.toLocaleString('zh-CN');
  }

  return props.metric.value;
});

const formattedRatioValue = computed(() => {
  if (props.failed) {
    return '--';
  }

  if (['**', '--'].includes(props.metric.ratio)) {
    return props.metric.ratio;
  }

  return Math.abs(props.metric.ratio)?.toLocaleString('zh-CN');
});

const ratioArrow = computed(() => {
  if (props.failed) {
    return '';
  }

  if (['**', '--'].includes(props.metric.ratio)) {
    return '';
  }
  if (props.metric.ratio >= 0) {
    return '▲';
  }
  return '▼';
});

const textClass = computed(() => {
  if (props.failed) {
    return '';
  }

  if (['**', '--'].includes(props.metric.ratio)) {
    return '';
  }

  let direction = Number(props.metric.ratio) >= 0 ? 'up' : 'down';
  if (props.metric.ratio === 0) {
    direction = props.upGreen ? 'up' : 'down';
  }

  let color = 'green';
  if (props.upGreen) {
    color = direction === 'up' ? 'green' : 'red';
  } else {
    color = direction === 'up' ? 'red' : 'green';
  }

  return color;
});
</script>

<style lang="less" scoped>
.svg-icon-class {
  width: 14px;
  height: 14px;
}
.van-icon-class {
  color: #5e63c8;
  font-size: 14px;
}
.help-icon {
  color: #8e919d;
  font-size: 11px;
}
.metric-content {
  position: relative;
}
.flex-center {
  display: flex;
  align-items: center;
  gap: 4px;
}

.metric-label {
  color: rgba(51, 51, 107, 1);
  font-family: 'Microsoft YaHei';
  font-style: Bold;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0px;
  text-align: left;
}

.metric-label.separate-icon-row {
  display: grid;
  grid-template-columns: max-content max-content;
  column-gap: 4px;
  row-gap: 2px;
}

.metric-label.separate-icon-row > .svg-icon-class,
.metric-label.separate-icon-row > .van-icon-class {
  grid-column: 1 / -1;
  justify-self: start;
}

.metric-help-content {
  width: 180px;
  padding: 10px 12px;
  color: #595a8a;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}

.metric-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5c4bc4;
  width: 14px;
  height: 14px;
}

.metric-value-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-top: 6px;
  white-space: nowrap;
}

.metric-value {
  color: rgba(51, 51, 107, 1);
  font-family: 'Microsoft YaHei';
  font-style: Bold;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
}

.metric-unit {
  color: rgba(89, 90, 138, 1);
  font-family: 'Microsoft YaHei';
  font-style: Regular;
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: left;
}

.metric-trend,
.metric-trends-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 4px;
}

.metric-trend {
  flex-direction: row;
  align-items: center;
  gap: 3px;
  color: #8b86a2;
  font-size: 10px;
  white-space: nowrap;
}

.metric-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
}

.detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  color: #77718f;
  font-size: 10px;
}

.detail-label {
  display: inline-flex;
  align-items: center;
}

.help-icon-small {
  margin-left: 2px;
  color: #a4a7b5;
  font-size: 10px;
}

.detail-row strong {
  color: #4f4a7b;
  font-weight: 500;
}

.detail-row strong.trend-up {
  color: #19bfa8;
}

.detail-row strong.trend-down {
  color: #ef5370;
}

.metric-ratio {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-top: 3px;
}
.ratio-label {
  color: rgba(89, 90, 138, 1);
  font-family: 'Microsoft YaHei';
  font-style: Regular;
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 3px;
}

.ratio-value-row {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.ratio-value {
  color: rgba(89, 90, 138, 1);
  font-family: 'Microsoft YaHei';
  font-style: Regular;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0px;
  text-align: left;
  white-space: nowrap;
}

.ratio-unit {
  color: rgba(89, 90, 138, 1);
  font-family: 'Microsoft YaHei';
  font-style: Regular;
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: left;
  white-space: nowrap;
}
.ratio-arrow {
  font-size: 0.24rem;
}

.green {
  color: #1bcc8e;
}

.red {
  color: #f55b5b;
}

.compact {
  padding: 0 0.08rem;
}

.compact .metric-label {
  font-size: 10px;
  font-weight: 400;
  line-height: 13px;
}

.compact .metric-value-row {
  margin-top: 2px;
}

.compact .metric-value {
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;
}

.compact .metric-unit {
  font-size: 10px;
  font-weight: 400;
  line-height: 13px;
}
.compact .metric-ratio {
  display: none;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
}

.item-right {
  display: flex;
  gap: 4px;
}

.item-value {
  color: rgba(51, 51, 107, 1);
  font-family: 'Microsoft YaHei';
  font-style: Regular;
  font-size: 10px;
  font-weight: 700;
  line-height: 13px;
  letter-spacing: 0px;
  text-align: left;
}

.item-unit {
  color: rgba(51, 51, 107, 1);
  font-family: 'Microsoft YaHei';
  font-style: Regular;
  font-size: 10px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0px;
  text-align: left;
}
</style>
