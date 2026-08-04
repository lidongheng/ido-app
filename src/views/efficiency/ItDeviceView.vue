<template>
  <div class="it-device-efficiency">
    <!-- 加载状态 -->
    <van-loading v-if="loading" type="spinner" class="page-loading" />
    
    <!-- 按设备类型 -->
    <card-layout
      title="按设备类型"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <!-- IT设备 SubCard -->
      <sub-card
        title="IT设备"
        icon="desktop-o"
        :show-arrow="true"
        @click="toggleItDevice"
      >
        <!-- 总览数据 - 使用父组件传递的 sharedData -->
        <stats-grid :columns="2" gap="medium">
          <data-item
            :value="itDeviceInfo.total || 1524211"
            label="资产总数"
            unit="台"
            size="medium"
          />
          <data-item
            :value="itDeviceInfo.online || 1021654"
            label="在线资产数"
            unit="台"
            size="medium"
          />
        </stats-grid>
        
        <divider-line spacing="medium" />
        
        <data-item
          value="92.16"
          label="资产在线率"
          unit="%"
          trend="0.45%"
          :show-trend="true"
          trend-type="up"
          size="medium"
        />
        
        <!-- 子项列表 -->
        <div v-if="itDeviceExpanded" class="sub-items">
          <!-- 通算服务器 -->
          <sub-card
            title="通算服务器"
            icon="cluster-o"
            :show-arrow="true"
          >
            <stats-grid :columns="2" gap="medium">
              <data-item
                :value="446852"
                label="在线资产数"
                unit="台"
                size="small"
              />
              <data-item
                value="95.32"
                label="资产在线率"
                unit="%"
                trend="0.23%"
                :show-trend="true"
                trend-type="up"
                size="small"
              />
            </stats-grid>
          </sub-card>
          
          <!-- 智算服务器 -->
          <sub-card
            title="智算服务器"
            icon="cluster-o"
            :show-arrow="true"
          >
            <stats-grid :columns="2" gap="medium">
              <data-item
                :value="516852"
                label="在线资产数"
                unit="卡"
                size="small"
              />
              <data-item
                value="89.67"
                label="资产在线率"
                unit="%"
                trend="0.12%"
                :show-trend="true"
                trend-type="down"
                size="small"
              />
            </stats-grid>
          </sub-card>
          
          <!-- 存储服务器 -->
          <sub-card
            title="存储服务器"
            icon="logistics"
            :show-arrow="true"
          >
            <stats-grid :columns="2" gap="medium">
              <data-item
                :value="57950"
                label="在线资产数"
                unit="台"
                size="small"
              />
              <data-item
                value="91.48"
                label="资产在线率"
                unit="%"
                trend="0.08%"
                :show-trend="true"
                trend-type="up"
                size="small"
              />
            </stats-grid>
          </sub-card>
        </div>
      </sub-card>
    </card-layout>
  </div>
</template>

<script>
import CardLayout from '@/components/card-layout/index.vue'
import SubCard from '@/components/sub-card/index.vue'
import DataItem from '@/components/data-item/index.vue'
import StatsGrid from '@/components/stats-grid/index.vue'
import DividerLine from '@/components/divider-line/index.vue'

export default {
  name: 'ItDeviceEfficiencyView',
  components: {
    CardLayout,
    SubCard,
    DataItem,
    StatsGrid,
    DividerLine
  },
  // 接收父组件通过 router-view 传递的 props
  props: {
    sharedData: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  // 定义子组件可触发的事件
  emits: ['refresh'],
  data() {
    return {
      itDeviceExpanded: true
    }
  },
  computed: {
    // 从 sharedData 中获取 IT 设备数据
    itDeviceInfo() {
      return this.sharedData?.itDevice || {}
    }
  },
  methods: {
    toggleItDevice() {
      this.itDeviceExpanded = !this.itDeviceExpanded
    },
    // 触发父组件刷新数据
    handleRefresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>
.it-device-efficiency {
  padding-bottom: 0.43rem;
}

.page-loading {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

.sub-items {
  margin-top: 0.43rem;
  padding-top: 0.43rem;
  border-top: 1px solid #ebedf0;
}

:deep(.sub-card) {
  margin-bottom: 0.32rem;
}

:deep(.sub-card:last-child) {
  margin-bottom: 0;
}
</style>

