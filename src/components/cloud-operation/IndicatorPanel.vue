<template>
  <div class="indicator-panel" :style="panelStyle">
    <article v-for="item in items" :key="item.label" class="indicator-item">
      <div class="indicator-label">
        <van-icon v-if="item.icon" :name="item.icon" />
        <span>{{ item.label }}</span>
        <van-icon v-if="item.help" class="help-icon" name="question-o" />
      </div>
      <div class="indicator-value-row">
        <strong>{{ item.value }}</strong>
        <span v-if="item.unit">{{ item.unit }}</span>
      </div>
      <div v-if="item.trend" class="indicator-trend">
        <span>{{ item.trend.label }}</span>
        <trend-value
          :value="item.trend.value"
          :direction="item.trend.direction"
          :unit="item.trend.unit || ''"
        />
      </div>
      <div v-if="item.trends" class="indicator-trends-group">
        <div v-for="tr in item.trends" :key="tr.label" class="indicator-trend">
          <span>{{ tr.label }}</span>
          <trend-value
            :value="tr.value"
            :direction="tr.direction"
            :unit="tr.unit || ''"
          />
        </div>
      </div>
      <div v-if="item.details" class="indicator-details">
        <div v-for="detail in item.details" :key="detail.label" class="detail-row">
          <span class="detail-label">
            {{ detail.label }}
            <van-icon v-if="detail.help !== false" class="help-icon-small" name="question-o" />
          </span>
          <strong :class="{ 'trend-up': detail.highlight === 'up', 'trend-down': detail.highlight === 'down' }">
            {{ detail.value }}
          </strong>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import TrendValue from './TrendValue.vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  columns: {
    type: Number,
    required: true,
  },
  bordered: {
    type: Boolean,
    required: true,
  },
});

const panelStyle = computed(() => {
  return {
    gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))`,
    borderWidth: props.bordered ? '1px' : '0',
  };
});
</script>

<style lang="less" scoped>
.indicator-panel {
  display: grid;
  overflow: hidden;
  border-style: solid;
  border-color: #e5eaf5;
  border-radius: 9px;
  background: #fff;
}

.indicator-item {
  min-width: 0;
  padding: 10px 8px;
}

.indicator-item + .indicator-item {
  border-left: 1PX solid #edf0f6;
}

.indicator-label {
  display: flex;
  min-height: 18px;
  align-items: center;
  gap: 4px;
  color: #353575;
  font-size: 12px;
  font-weight: 700;
}

.indicator-label > .van-icon:first-child {
  color: #5e63c8;
  font-size: 14px;
}

.help-icon {
  color: #8e919d;
  font-size: 11px;
}

.help-icon-small {
  color: #a4a7b5;
  font-size: 10px;
  margin-left: 2px;
}

.indicator-value-row {
  display: flex;
  align-items: baseline;
  gap: 3px;
  margin-top: 6px;
  color: #353575;
  white-space: nowrap;
}

.indicator-value-row strong {
  font-size: 19px;
  line-height: 22px;
}

.indicator-value-row span {
  color: #8b86a2;
  font-size: 10px;
}

.indicator-trend,
.indicator-trends-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 4px;
}

.indicator-trend {
  flex-direction: row;
  align-items: center;
  gap: 3px;
  color: #8b86a2;
  font-size: 10px;
  white-space: nowrap;
}

.indicator-details {
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
</style>
