<template>
  <div class="it-device-cost">
    <!-- 按设备类型 -->
    <card-layout
      title="按设备类型"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <!-- IT设备 SubCard（主卡片） -->
      <sub-card
        :title="itDeviceData.name"
        icon="desktop-o"
        :show-arrow="true"
        @click="toggleItDevice"
      >
        <stats-grid :columns="2" gap="medium">
          <data-item
            :value="itDeviceData.cost"
            label="当月成本"
            unit="亿元"
            icon="chart-trending-o"
            size="medium"
          />
          <data-item
            :value="itDeviceData.ttlCost"
            label="当年累计成本"
            unit="亿元"
            icon="chart-trending-o"
            size="medium"
          />
        </stats-grid>
        <divider-line spacing="medium" />
        <data-item
          :value="itDeviceData.unitCost"
          label="单位成本"
          unit="元/台"
          icon="balance-list-o"
          size="medium"
          :status-dot="itDeviceData.statusDot"
        />
      </sub-card>

      <!-- 子设备列表（展开时显示） -->
      <template v-if="itDeviceExpanded && itDeviceData.children">
        <card-tree :data="itDeviceData.children">
          <template #default="{ item }">
            <sub-card
              :title="item.name"
              icon="server-o"
              :show-arrow="false"
            >
              <stats-grid :columns="2" gap="medium">
                <data-item
                  :value="item.cost"
                  label="当月成本"
                  unit="亿元"
                  icon="chart-trending-o"
                  size="small"
                />
                <data-item
                  :value="item.ttlCost"
                  label="当年累计成本"
                  unit="亿元"
                  icon="chart-trending-o"
                  size="small"
                />
              </stats-grid>
              <divider-line spacing="small" />
              <data-item
                :value="item.unitCost"
                label="单位成本"
                unit="元/台"
                icon="balance-list-o"
                size="small"
                :status-dot="item.statusDot"
              />
            </sub-card>
          </template>
        </card-tree>
      </template>
    </card-layout>
  </div>
</template>

<script>
import CardLayout from '@/components/card-layout/index.vue'
import SubCard from '@/components/sub-card/index.vue'
import CardTree from '@/components/card-tree/index.vue'
import DataItem from '@/components/data-item/index.vue'
import StatsGrid from '@/components/stats-grid/index.vue'
import DividerLine from '@/components/divider-line/index.vue'
import { safeCall, debounce } from '@/utils/utils.js'

// 模拟后端返回的数据
import mockData from '@/data/0107.json'

// ============ 模拟后端接口 ============
const mockApi = {
  // 获取 IT 设备成本数据
  getItDeviceCost() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData)
      }, 100)
    })
  }
}

export default {
  name: 'ItDeviceCostView',
  components: {
    CardLayout,
    SubCard,
    CardTree,
    DataItem,
    StatsGrid,
    DividerLine,
  },
  data() {
    return {
      loading: false,
      itDeviceExpanded: false, // 默认收起
      itDeviceData: {} // 后端返回的数据
    }
  },
  created() {
    console.log('21');
    // 创建防抖版本的请求函数（每个组件实例独立）
    this.debouncedFetchData = debounce(this._fetchData, 300)
    // 首次加载
    this.debouncedFetchData()
  },
  methods: {
    // 对外暴露的请求方法（带防抖）
    fetchData() {
      this.debouncedFetchData()
    },
    
    // 实际请求逻辑（内部使用）
    async _fetchData() {
      this.loading = true
      try {
        // 使用 safeCall 请求，出错返回默认值
        const result = await safeCall(
          mockApi.getItDeviceCost(),
          { name: '', cost: 0, ttlCost: 0, unitCost: 0, children: [] }
        )
        this.itDeviceData = this.transformData(result)
      } finally {
        this.loading = false
      }
    },
    
    // 数据转换（如果后端数据格式需要转换）
    transformData(rawData) {
      return {
        name: rawData.name || '',
        cost: rawData.cost || 0,
        ttlCost: rawData.ttlCost || 0,
        unitCost: rawData.unitCost || 0,
        statusDot: this.getStatusDot(rawData.unitCostRatio),
        children: rawData.children?.map(child => ({
          name: child.name,
          cost: child.cost,
          ttlCost: child.ttlCost,
          unitCost: child.unitCost,
          statusDot: this.getStatusDot(child.unitCostRatio),
          assetCount: child.assetCount
        })).sort((a, b) => {
          const costA = parseFloat(String(a.cost).replace(/,/g, '')) || 0
          const costB = parseFloat(String(b.cost).replace(/,/g, '')) || 0
          return costB - costA
        }) || []
      }
    },
    
    /**
     * 根据单位成本环比计算状态点颜色
     * @param {number} ratio - 单位成本环比值
     * @returns {string} - 'green' | 'orange' | 'red' | ''
     * 
     * 图例规则：
     * - 绿色：单位成本环比 ≤ 0
     * - 橙色：0 < 单位成本环比 ≤ 10%
     * - 红色：单位成本环比 > 10%
     */
    getStatusDot(ratio) {
      if (ratio === undefined || ratio === null) return ''
      if (ratio <= 0) return 'green'
      if (ratio <= 0.1) return 'orange'
      return 'red'
    },
    
    toggleItDevice() {
      this.itDeviceExpanded = !this.itDeviceExpanded
    }
  }
}
</script>

<style scoped>
.it-device-cost {
  padding-bottom: 0.43rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.43rem 0;
  border-bottom: 1px solid #ebedf0;
  margin-bottom: 0.43rem;
}

.summary-item {
  text-align: left;
}

.summary-item .value {
  font-size: 0.64rem;
  font-weight: 600;
  color: #252b3a;
  margin-bottom: 0.16rem;
}

.summary-item .unit {
  font-size: 0.37rem;
  font-weight: 400;
  color: #969aa3;
  margin-left: 0.05rem;
}

.summary-item .label {
  font-size: 0.32rem;
  color: #969aa3;
}

.sub-items {
  margin-top: 0.32rem;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.43rem;
  padding: 0.32rem 0;
}

.data-grid.cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.data-row {
  display: flex;
  justify-content: space-between;
  padding: 0.32rem 0;
}

.data-item .value {
  font-size: 0.48rem;
  font-weight: 600;
  color: #252b3a;
  margin-bottom: 0.11rem;
  display: flex;
  align-items: center;
}

.data-item .unit {
  font-size: 0.32rem;
  font-weight: 400;
  color: #969aa3;
  margin-left: 0.05rem;
}

.data-item .label {
  font-size: 0.32rem;
  color: #969aa3;
}

.status-dot {
  width: 0.21rem;
  height: 0.21rem;
  border-radius: 50%;
  margin-right: 0.16rem;
  display: inline-block;
}

.status-dot.green {
  background: #07c160;
}

.status-dot.orange {
  background: #ff976a;
}

.status-dot.red {
  background: #ee0a24;
}

.nested-items {
  margin-top: 0.32rem;
  padding-top: 0.32rem;
  border-top: 1px solid #ebedf0;
}

.nested-card {
  background: #fff;
}

:deep(.sub-card) {
  margin-bottom: 0.32rem;
}

:deep(.sub-card:last-child) {
  margin-bottom: 0;
}
</style>

