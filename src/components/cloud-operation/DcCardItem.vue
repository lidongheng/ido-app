<template>
  <div class="dc-card flex-columns">
    <div class="badge">{{ title }}</div>
    <div v-for="item in filterData" :key="item.label" class="item-row">
      <div class="header">
        <SvgIcon
          v-if="item.iconName"
          :icon-name="item.iconName"
          class="svg-icon-class"
        ></SvgIcon>
        <span class="card-label">{{ item.label }}</span>
        <span class="card-sub-label" v-if="item.subLabel"
          >{{ item.subLabel }}</span
        >
      </div>
      <skeleton :loading="loading" :height="36">
        <div class="bar-row">
          <div
            class="bar-left bar-item flex-center p-relative"
            :style="{ background: barBg }"
          >
            <div class="p-absolute" v-if="item.label === '客户'"></div>
            <span class="flex-center z-index-text">
              <span class="bar-name">{{ item.name }}</span>
              <span class="bar-value">{{ formatValueText(item.value) }}</span>
              <span class="bar-unit">{{ item.unit }}</span>
            </span>
          </div>
          <div 
            class="bar-left bar-item flex-center p-relative" 
            :style="{ background: barBg }"
            v-if="title === '使用'"
          >
            <div class="p-absolute" v-if="item.label === '客户'"></div>
            <span class="flex-center z-index-text">
              <span class="bar-name">{{ item.name2 }}</span>
              <span class="bar-value">{{ formatValueText(item.value2) }}</span>
              <span class="bar-unit">{{ item.unit2 }}</span>
            </span>
          </div>
          <div 
            :class="[
              'bar-right',
              'bar-item',
              'flex-center',
              `w-${item.subBarWidth}`
            ]"
            :style="{ background: `${subBarBg}` }"
            v-if="item.subValue"
          >
            <span class="bar-name" v-if="showSubBar">{{ item.subName }}</span>
            <span class="bar-value" v-if="showSubBar">{{ formatValueText(item.subValue) }}</span>
            <span class="bar-unit" v-if="showSubBar">{{ item.unit }}</span>
          </div>
        </div>
      </skeleton>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import SvgIcon from '@/components/cloud-operation/SvgIcon.vue';
import skeleton from '@/components/skeleton/index.vue';

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  data: {
    type: Array,
    default: () => [],
  },
  showSubBar: {
    type: Boolean,
    default: false,
  },
  barBg: {
    type: String,
    default: '#D6E6FF',
  },
  subBarBg: {
    type: String,
    default: 'fff',
  },
  loading: {
    type: Boolean,
    default: true,
  },
  failed: {
    type: Boolean,
    required: true,
  },
});

const filterData = computed(() => {
  return props.data?.filter((v) => (v.value && v.value !== '--') || v.name !== '土地');
});

const formatValueText = (value) => {
  if (props.failed) {
    return '--';
  }

  if (typeof value === 'number') {
    return value.toLocaleString('zh-CN');
  }
  return value;
};
</script>

<style lang="less" scoped>
.w-60 {
  width: 60px;
}
.w-70 {
  width: 70px;
}
.w-80 {
  width: 80px;
}
.w-90 {
  width: 90px;
}
.w-100 {
  width: 100px;
}
.w-120 {
  width: 120px;
}
.svg-icon-class {
  width: 14px;
  height: 14px;
}
.dc-card {
  padding: 10px 11px;
  position: relative;
  border: 1.6px solid rgba(229, 237, 252, 1);
  border-radius: 8px;
}

.item-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.flex-columns {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.badge {
  width: 38px;
  height: 16px;
  position: absolute;
  top: 0px;
  right: 0px;
  border-radius: 0px 8px 0px 8px;
  background: rgba(233, 242, 254, 1);
  color: rgba(37, 43, 58, 1);
  font-family: 'Microsoft YaHei';
  font-style: Bold;
  font-size: 10px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: center;
}

.header {
  display: flex;
  align-items: center;
  gap: 2px;
}

.card-label {
  color: rgba(37, 43, 58, 1);
  font-family: 'Microsoft YaHei';
  font-style: Bold;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: left;
}

.card-sub-label {
    color: rgba(89, 90, 138, 1);
    font-family: 'Microsoft YaHei';
    font-style: Regular;
    font-size: 10px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0px;
    text-align: left;
}

.bar-row {
    // width: 306px;
    height: 36px;
    display: flex;
    gap: 4px;
}

.bar-left {
    flex: 1;
}

.bar-right {
    flex-shrink: 0;
}

.bar-item {
    border-radius: 8px;
}

.bar-name {
    color: rgba(37, 43, 58, 1);
    font-family: 'Microsoft YaHei';
    font-style: Bold;
    font-size: 10px;
    font-weight: 700;
    line-height: 13px;
    letter-spacing: 0px;
    text-align: left;
}

.bar-value {
    color: rgba(37, 43, 58, 1);
    font-family: 'Arial';
    font-style: Bold;
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    letter-spacing: 0px;
    text-align: left;
}

.bar-unit {
    color: rgba(87, 93, 108, 1);
    font-family: 'Microsoft YaHei';
    font-style: Regular;
    font-size: 10px;
    font-weight: 400;
    line-height: 13px;
    letter-spacing: 0px;
    text-align: left;
}

.p-relative {
    position: relative;
}

.p-absolute {
    width: 28px;
    height: 36px;
    position: absolute;
    top: 0px;
    right: 0px;
    border-radius: 0px 8px 8px 0px;
    background: #f5f5f5;
    z-index: 1;
}

.z-index-text {
    z-index: 2;
}
</style>
