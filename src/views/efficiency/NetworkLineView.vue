<template>
  <div class="network-line-efficiency">
    <!-- 按线路类型 -->
    <card-layout
      title="按线路类型"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <!-- 网络线路 SubCard -->
      <sub-card
        title="网络线路"
        icon="logistics"
        :show-arrow="true"
        @click="toggleNetworkLine"
      >
        <!-- 总览数据 -->
        <data-item
          :value="183275"
          label="线路数"
          unit="条"
          size="large"
        />
        
        <divider-line spacing="medium" />
        
        <stats-grid :columns="2" gap="medium">
          <data-item
            value="92.16"
            label="骨干国家/承载占比"
            unit="%"
            trend="0.45%"
            :show-trend="true"
            trend-type="down"
            size="small"
          />
          <data-item
            value="89.65"
            label="国内Peer/承载对接占比"
            unit="%"
            trend="0.45%"
            :show-trend="true"
            trend-type="down"
            size="small"
          />
        </stats-grid>
        
        <!-- 子项列表 -->
        <div v-if="networkLineExpanded" class="sub-items">
          <!-- 骨干线路 -->
          <sub-card
            title="骨干线路"
            icon="guide-o"
            :show-arrow="true"
          >
            <stats-grid :columns="2" gap="medium">
              <data-item
                :value="26275"
                label="线路数"
                unit="条"
                size="small"
              />
              <data-item
                value="98.32"
                label="线路在线率"
                unit="%"
                trend="0.12%"
                :show-trend="true"
                trend-type="up"
                size="small"
              />
            </stats-grid>
          </sub-card>
          
          <!-- 城域线路 -->
          <sub-card
            title="城域线路"
            icon="location-o"
            :show-arrow="true"
          >
            <stats-grid :columns="2" gap="medium">
              <data-item
                :value="72468"
                label="线路数"
                unit="条"
                size="small"
              />
              <data-item
                value="95.67"
                label="线路在线率"
                unit="%"
                trend="0.08%"
                :show-trend="true"
                trend-type="up"
                size="small"
              />
            </stats-grid>
          </sub-card>
          
          <!-- 接入线路 -->
          <sub-card
            title="接入线路"
            icon="exchange"
            :show-arrow="true"
          >
            <stats-grid :columns="2" gap="medium">
              <data-item
                :value="84532"
                label="线路数"
                unit="条"
                size="small"
              />
              <data-item
                value="91.24"
                label="线路在线率"
                unit="%"
                trend="0.21%"
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
import DividerLine from '@/components/divider-line/index.vue'

export default {
  name: 'NetworkLineEfficiencyView',
  components: {
    CardLayout,
    SubCard,
    DataItem,
    StatsGrid,
    DividerLine
  },
  data() {
    return {
      networkLineExpanded: true
    }
  },
  methods: {
    toggleNetworkLine() {
      this.networkLineExpanded = !this.networkLineExpanded
    }
  }
}
</script>

<style scoped>
.network-line-efficiency {
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

