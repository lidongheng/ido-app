<template>
  <article class="dc-card-item">
    <header class="card-header">
      <span class="card-title">{{ title }}</span>
    </header>

    <div class="card-content">
      <section v-for="item in data" :key="item.label" class="data-item">
        <div class="data-label">
          <span class="label-main">
            <SvgIcon :icon-name="item.iconName" class="data-icon"></SvgIcon>
            <span>{{ item.label }}</span>
          </span>
          <span v-if="item.subLabel" class="sub-label">（{{ item.subLabel }}）</span>
        </div>

        <Skeleton
          :loading="loading"
          width="100%"
          :height="32"
          class="data-skeleton"
        >
          <div v-if="item.name2" class="double-value-row">
            <div class="value-track">
              <span>{{ item.name }} <strong>{{ getDisplayValue(item.value) }}</strong> {{ item.unit }}</span>
            </div>
            <div class="value-track">
              <span>{{ item.name2 }} <strong>{{ getDisplayValue(item.value2) }}</strong> {{ item.unit2 }}</span>
            </div>
          </div>

          <div v-else class="progress-track">
            <div
              class="main-bar"
              :style="{
                width: getMainBarWidth(item),
                background: barBg,
              }"
            ></div>
            <div
              v-if="showSubBar && item.subName"
              class="sub-bar"
              :style="{
                width: `${item.subBarWidth}%`,
                background: subBarBg,
              }"
            ></div>
            <span
              class="main-value"
              :style="{ width: getMainBarWidth(item) }"
            >
              {{ item.name }} <strong>{{ getDisplayValue(item.value) }}</strong> {{ item.unit }}
            </span>
            <span
              v-if="showSubBar && item.subName"
              class="sub-value"
              :style="{ width: `${item.subBarWidth}%` }"
            >
              {{ item.subName }} <strong>{{ getDisplayValue(item.subValue) }}</strong> {{ item.unit }}
            </span>
          </div>
        </Skeleton>
      </section>
    </div>
  </article>
</template>

<script setup>
import SvgIcon from './SvgIcon.vue';
import Skeleton from '@/components/skeleton/index.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  showSubBar: {
    type: Boolean,
    default: false,
  },
  barBg: {
    type: String,
    default: '#e5edff',
  },
  subBarBg: {
    type: String,
    default: '#f2f4f8',
  },
  loading: {
    type: Boolean,
    required: true,
  },
  failed: {
    type: Boolean,
    required: true,
  },
});

function getDisplayValue(value) {
  if (props.failed) {
    return '--';
  }

  return value;
}

function getMainBarWidth(item) {
  if (props.showSubBar && item.subName) {
    return `${100 - item.subBarWidth}%`;
  }

  return '100%';
}
</script>

<style lang="less" scoped>
.dc-card-item {
  overflow: hidden;
  border: 1px solid #e5edfc;
  border-radius: 8px;
  background: #fff;
}

.card-header {
  display: flex;
  height: 24px;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px;
  background: #f7f9ff;
}

.card-title {
  color: #33336b;
  font-size: 12px;
  font-weight: 700;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px 12px 12px;
}

.data-label {
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  color: #33336b;
  font-size: 14px;
}

.label-main {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 700;
}

.data-icon {
  width: 15px;
  height: 15px;
}

.sub-label {
  color: #777994;
  font-size: 12px;
}

.data-skeleton {
  margin-top: 0;
}

.progress-track,
.value-track {
  position: relative;
  height: 32px;
  overflow: hidden;
  border-radius: 7px;
  background: #f4f5f8;
}

.main-bar,
.sub-bar {
  position: absolute;
  top: 0;
  bottom: 0;
}

.main-bar {
  left: 0;
}

.sub-bar {
  right: 0;
}

.main-value,
.sub-value,
.value-track span {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #33336b;
  font-size: 13px;
  white-space: nowrap;
}

.main-value {
  left: 0;
}

.sub-value {
  right: 0;
  background: #fff;
}

.double-value-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.value-track {
  background: #e5edff;
}

.value-track span {
  inset: 0;
}

strong {
  margin: 0 4px;
  font-size: 15px;
}
</style>
