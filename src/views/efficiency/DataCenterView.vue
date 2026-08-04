<template>
  <div class="data-center-efficiency">
    <!-- 按数据中心 -->
    <card-layout
      title="按数据中心"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <!-- 数据中心 SubCard -->
      <sub-card
        title="数据中心"
        icon="wap-home-o"
        :show-arrow="true"
        @click="toggleDataCenter"
      >
        <!-- 总览数据 -->
        <stats-grid :columns="2" gap="medium">
          <data-item
            :value="198"
            label="数据中心数量"
            unit="个"
            size="medium"
          />
          <data-item
            :value="351521"
            label="已投产机柜"
            unit="台"
            size="medium"
          />
        </stats-grid>
        
        <divider-line spacing="medium" />
        
        <stats-grid :columns="2" gap="medium">
          <data-item
            value="1.214"
            label="全网年均PUE"
            trend="0.011"
            :show-trend="true"
            trend-type="up"
            size="small"
          />
          <data-item
            :value="832678"
            label="已投产容量"
            unit="MW"
            size="small"
          />
        </stats-grid>
        
        <divider-line spacing="medium" />
        
        <stats-grid :columns="2" gap="medium">
          <data-item
            value="92.16"
            label="华为云电力利用率"
            unit="%"
            trend="0.01%"
            :show-trend="true"
            trend-type="down"
            size="small"
          />
          <data-item
            value="84.13"
            label="租赁付费机柜启用率"
            unit="%"
            trend="0.45%"
            :show-trend="true"
            trend-type="up"
            size="small"
          />
        </stats-grid>
        
        <!-- 子项列表 -->
        <div v-if="dataCenterExpanded" class="sub-items">
          <!-- 自建数据中心 -->
          <sub-card
            title="自建数据中心"
            icon="hotel-o"
            :show-arrow="true"
          >
            <stats-grid :columns="2" gap="medium">
              <data-item
                :value="86"
                label="数据中心数量"
                unit="个"
                size="small"
              />
              <data-item
                value="1.18"
                label="年均PUE"
                trend="0.008"
                :show-trend="true"
                trend-type="down"
                size="small"
              />
              <data-item
                :value="186432"
                label="机柜数量"
                unit="台"
                size="small"
              />
              <data-item
                value="93.56"
                label="机柜启用率"
                unit="%"
                trend="0.32%"
                :show-trend="true"
                trend-type="up"
                size="small"
              />
            </stats-grid>
          </sub-card>
          
          <!-- 租赁数据中心 -->
          <sub-card
            title="租赁数据中心"
            icon="shop-o"
            :show-arrow="true"
          >
            <stats-grid :columns="2" gap="medium">
              <data-item
                :value="72"
                label="数据中心数量"
                unit="个"
                size="small"
              />
              <data-item
                value="1.25"
                label="年均PUE"
                trend="0.015"
                :show-trend="true"
                trend-type="up"
                size="small"
              />
              <data-item
                :value="98654"
                label="机柜数量"
                unit="台"
                size="small"
              />
              <data-item
                value="84.13"
                label="机柜启用率"
                unit="%"
                trend="0.18%"
                :show-trend="true"
                trend-type="up"
                size="small"
              />
            </stats-grid>
          </sub-card>
          
          <!-- 合建数据中心 -->
          <sub-card
            title="合建数据中心"
            icon="friends-o"
            :show-arrow="true"
          >
            <stats-grid :columns="2" gap="medium">
              <data-item
                :value="40"
                label="数据中心数量"
                unit="个"
                size="small"
              />
              <data-item
                value="1.22"
                label="年均PUE"
                trend="0.005"
                :show-trend="true"
                trend-type="down"
                size="small"
              />
              <data-item
                :value="66435"
                label="机柜数量"
                unit="台"
                size="small"
              />
              <data-item
                value="88.92"
                label="机柜启用率"
                unit="%"
                trend="0.28%"
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
  name: 'DataCenterEfficiencyView',
  components: {
    CardLayout,
    SubCard,
    DataItem,
    StatsGrid,
    DividerLine
  },
  data() {
    return {
      dataCenterExpanded: true
    }
  },
  methods: {
    toggleDataCenter() {
      this.dataCenterExpanded = !this.dataCenterExpanded
    }
  }
}
</script>

<style scoped>
.data-center-efficiency {
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

