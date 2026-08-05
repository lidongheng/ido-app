<template>
  <article class="metric-card" :class="{ compact, 'has-title': title }">
    <button
      v-if="title"
      class="card-header"
      :class="{ expandable }"
      type="button"
      @click="toggle"
    >
      <span class="card-title">
        <van-icon v-if="icon" :name="icon" class="card-title-icon" />
        {{ title }}
      </span>
      <span v-if="expandable" class="expand-label">
        {{ expanded ? '收起' : '展开' }}
        <van-icon :name="expanded ? 'arrow-up' : 'arrow-down'" />
      </span>
    </button>

    <div class="card-body">
      <stats-grid :columns="metrics.length" gap="small">
        <metric-item
          v-for="metric in metrics"
          :key="metric.label"
          :metric="metric"
          :compact="compact"
        />
      </stats-grid>
    </div>

    <div v-if="expanded && $slots.default" class="card-details">
      <slot></slot>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import StatsGrid from '@/components/stats-grid/index.vue'
import MetricItem from './MetricItem.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
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
  }
})

const expanded = ref(props.defaultExpanded)

function toggle() {
  if (!props.expandable) {
    return
  }

  expanded.value = !expanded.value
}
</script>

<style lang="less" scoped>
.metric-card {
  overflow: hidden;
  border: 1PX solid #e4e5ed;
  border-radius: 9px;
  background: #fff;
  box-shadow: 0 2px 7px rgba(45, 37, 85, 0.04);
}

.card-header {
  display: flex;
  width: 100%;
  min-height: 25px;
  align-items: center;
  justify-content: space-between;
  padding: 3px 10px;
  color: #28204f;
  background: linear-gradient(90deg, #e5e9ff 0%, #f1efff 100%);
  text-align: left;
}

.card-header.expandable {
  cursor: pointer;
}

.card-title {
  display: flex;
  min-width: 0;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
}

.card-title-icon {
  flex-shrink: 0;
  margin-right: 5px;
  color: #596fd7;
  font-size: 16px;
}

.expand-label {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 2px;
  color: #7176ae;
  font-size: 12px;
  font-weight: 400;
}

.card-body {
  padding: 12px 5px 13px;
}

.card-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 9px 10px;
}

.compact .card-body {
  padding-top: 9px;
  padding-bottom: 10px;
}
</style>
