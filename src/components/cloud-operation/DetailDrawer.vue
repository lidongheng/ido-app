<template>
  <van-popup
    :show="visible"
    position="bottom"
    round
    closeable
    :style="drawerStyle"
    @update:show="updateVisible"
  >
    <div class="detail-drawer">
      <h2>{{ title }}</h2>
      <indicator-panel
        :items="metrics"
        :columns="2"
        :bordered="true"
      />
      <table-list
        :table-column="columns"
        :table-data="rows"
        :default-sort="{}"
        :table-config="drawerTableConfig"
      />
    </div>
  </van-popup>
</template>

<script setup>
import IndicatorPanel from './IndicatorPanel.vue';
import TableList from './TableList.vue';

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  metrics: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:visible']);
const drawerStyle = {
  height: '60vh',
};
const drawerTableConfig = {
  size: 'small',
};

function updateVisible(value) {
  emit('update:visible', value);
}
</script>

<style lang="less" scoped>
:global(.van-popup--bottom) {
  right: auto;
  left: 50%;
  width: 100%;
  max-width: 500PX;
  transform: translateX(-50%);
}

.detail-drawer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  overflow-y: auto;
  padding: 18px 14px 24px;
  background: #f8f9fd;
}

.detail-drawer h2 {
  padding-right: 32px;
  color: #241c4f;
  font-size: 18px;
}
</style>
