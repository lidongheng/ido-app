<template>
  <div class="metric-content" :class="{ compact }">
    <div class="metric-label flex-center">
      <SvgIcon
        v-if="metric.iconName"
        :icon-name="metric.iconName"
        class="svg-icon-class"
      ></SvgIcon>
      <span>{{ metric.label }}</span>
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
  </div>
</template>

<script setup>
import { computed } from 'vue';
import SvgIcon from '@/components/cloud-operation/SvgIcon.vue';
import skeleton from '@/components/skeleton/index.vue';

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
});

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
  if (!props.metric.ratio) {
    const direction = Number(props.metric.ratio) >= 0 ? 'up' : 'down';
    let color = "";
    if (props.upGreen) {
      color = direction === 'up' ? 'green' : 'red';
    } else {
      color = direction === 'up' ? 'red' : 'green';
    }
    return color;
  }
  return 'green';
});
</script>

<style lang="less" scoped>
.svg-icon-class {
  width: 14px;
  height: 14px;
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
</style>
