<template>
  <div class="network-device-efficiency">
    <!-- 按设备类型 -->
    <card-layout
      title="按设备类型"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <!-- 网络设备 SubCard -->
      <sub-card
        title="网络设备"
        icon="cluster-o"
        :show-arrow="true"
        @click="toggleNetworkDevice"
      >
        <!-- 总览数据 -->
        <stats-grid :columns="2" gap="medium">
          <data-item
            :value="467812"
            label="网络设备数量"
            unit="台"
            size="medium"
          />
          <data-item
            value="94.57"
            label="网络设备在线率"
            unit="%"
            trend="0.45%"
            :show-trend="true"
            trend-type="up"
            size="medium"
          />
        </stats-grid>
        
        <!-- 子项列表 -->
        <div v-if="networkDeviceExpanded" class="sub-items">
          <!-- 交换机 -->
          <sub-card
            title="交换机"
            icon="exchange"
            :show-arrow="true"
          >
            <stats-grid :columns="2" gap="medium">
              <data-item
                :value="256432"
                label="设备数量"
                unit="台"
                size="small"
              />
              <data-item
                value="96.32"
                label="设备在线率"
                unit="%"
                trend="0.18%"
                :show-trend="true"
                trend-type="up"
                size="small"
              />
            </stats-grid>
          </sub-card>
          
          <!-- 路由器 -->
          <sub-card
            title="路由器"
            icon="guide-o"
            :show-arrow="true"
          >
            <stats-grid :columns="2" gap="medium">
              <data-item
                :value="128765"
                label="设备数量"
                unit="台"
                size="small"
              />
              <data-item
                value="93.48"
                label="设备在线率"
                unit="%"
                trend="0.32%"
                :show-trend="true"
                trend-type="up"
                size="small"
              />
            </stats-grid>
          </sub-card>
          
          <!-- 防火墙 -->
          <sub-card
            title="防火墙"
            icon="shield-o"
            :show-arrow="true"
          >
            <stats-grid :columns="2" gap="medium">
              <data-item
                :value="82615"
                label="设备数量"
                unit="台"
                size="small"
              />
              <data-item
                value="91.87"
                label="设备在线率"
                unit="%"
                trend="0.11%"
                :show-trend="true"
                trend-type="down"
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

export default {
  name: 'NetworkDeviceEfficiencyView',
  components: {
    CardLayout,
    SubCard,
    DataItem,
    StatsGrid
  },
  data() {
    return {
      networkDeviceExpanded: true
    }
  },
  methods: {
    toggleNetworkDevice() {
      this.networkDeviceExpanded = !this.networkDeviceExpanded
    }
  }
}
</script>

<style scoped>
.network-device-efficiency {
  padding-bottom: 0.43rem;
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

