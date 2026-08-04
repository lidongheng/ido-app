<template>
  <div class="overview-page">
    <div class="header">
      <h2>总览</h2>
    </div>
    <div class="content">
      <!-- 效率主卡片（包含多个子卡片） -->
      <card-layout
        title="效率"
        :show-blue-line="true"
        :show-nav="false"
        :show-help="false"
      >
        <!-- IT设备子卡片 -->
        <sub-card
          title="IT设备"
          icon="desktop-o"
          @click="handleNavigate('IT设备')"
        >
          <stats-grid :columns="2" gap="medium">
            <data-item
              :value="1524211"
              label="资产总数"
              unit="台"
              icon="chart-trending-o"
              size="medium"
            />
            <data-item
              :value="1021654"
              label="服务器数量"
              unit="台"
              icon="orders-o"
              size="medium"
            />
          </stats-grid>
          
          <divider-line spacing="medium" />
          
          <data-item
            value="92.16"
            label="资产在线率"
            unit="%"
            icon="shield-o"
            trend="0.45%"
            :show-trend="true"
            trend-type="up"
            size="medium"
          />
        </sub-card>

        <!-- 网络设备子卡片 -->
        <sub-card
          title="网络设备"
          icon="cluster-o"
          @click="handleNavigate('网络设备')"
        >
          <stats-grid :columns="2" gap="medium">
            <data-item
              :value="467812"
              label="网络设备数量"
              unit="台"
              icon="cluster-o"
              size="medium"
            />
            <data-item
              value="94.57"
              label="网络资产在线率"
              unit="%"
              icon="shield-o"
              trend="0.45%"
              :show-trend="true"
              trend-type="up"
              size="medium"
            />
          </stats-grid>
        </sub-card>

        <!-- 网络线路子卡片 -->
        <sub-card
          title="网络线路"
          icon="logistics"
          @click="handleNavigate('网络线路')"
        >
          <data-item
            :value="183275"
            label="线路数"
            unit="条"
            icon="guide-o"
            size="large"
          />
          
          <divider-line spacing="medium" />
          
          <stats-grid :columns="2" gap="medium">
            <data-item
              value="92.16"
              label="骨干自建流量占比"
              unit="%"
              icon="filter-o"
              trend="0.45%"
              :show-trend="true"
              trend-type="up"
              size="small"
            />
            <data-item
              value="89.65"
              label="国内价值Peer流量对接占比"
              unit="%"
              icon="share-o"
              trend="0.45%"
              :show-trend="true"
              trend-type="up"
              size="small"
            />
          </stats-grid>
        </sub-card>

        <!-- 数据中心子卡片 -->
        <sub-card
          title="数据中心"
          icon="wap-home-o"
          @click="handleNavigate('数据中心')"
        >
          <stats-grid :columns="2" gap="medium">
            <data-item
              :value="198"
              label="数据中心数量"
              unit="个"
              icon="location-o"
              size="medium"
            />
            <data-item
              :value="351521"
              label="已投产机柜"
              unit="台"
              icon="bars"
              size="medium"
            />
          </stats-grid>
          
          <divider-line spacing="medium" />
          
          <stats-grid :columns="2" gap="medium">
            <data-item
              value="1.214"
              label="全网年均PUE"
              icon="fire-o"
              trend="0.011"
              :show-trend="true"
              trend-type="up"
              size="small"
              :format="false"
            />
            <data-item
              :value="832678"
              label="已投产容量"
              unit="MW"
              icon="chart-trending-o"
              size="small"
            />
          </stats-grid>
          
          <divider-line spacing="medium" />
          
          <stats-grid :columns="2" gap="medium">
            <data-item
              value="92.16"
              label="华为云电力利用率"
              unit="%"
              icon="underway-o"
              trend="0.01%"
              :show-trend="true"
              trend-type="down"
              size="small"
            />
            <data-item
              value="84.13"
              label="租赁付费机柜启用率"
              unit="%"
              icon="todo-list-o"
              trend="0.45%"
              :show-trend="true"
              trend-type="up"
              size="small"
            />
          </stats-grid>
        </sub-card>
      </card-layout>
      <!-- infra成本卡片 -->
    <card-layout
      title="成本"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <!-- infra成本 SubCard（主卡片） -->
      <sub-card
        title="infra成本"
        icon="desktop-o"
        :show-arrow="true"
        @click="toggleItDevice"
      >
        <stats-grid :columns="2" gap="medium">
          <data-item
            :value="infraData.cost"
            label="当月成本"
            unit="亿元"
            icon="chart-trending-o"
            size="medium"
          />
          <data-item
            :value="infraData.ttlCost"
            label="当年累计成本"
            unit="亿元"
            icon="chart-trending-o"
            size="medium"
          />
        </stats-grid>
      </sub-card>

      <!-- 子成本列表（device、network、dc） -->
      <template v-if="costChildren.length > 0">
        <card-tree :data="costChildren" :collapsible="false">
          <template #default="{ item, hasChildren }">
            <sub-card
              :title="item.name"
              icon="server-o"
              :show-arrow="hasChildren"
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
            </sub-card>
          </template>
        </card-tree>
      </template>
    </card-layout>
    </div>

    <!-- 回到顶部按钮 -->
    <back-top :visibility-height="300" bottom="120px" />
  </div>
</template>

<script>
import CardLayout from '@/components/card-layout/index.vue'
import SubCard from '@/components/sub-card/index.vue'
import CardTree from '@/components/card-tree/index.vue'
import DataItem from '@/components/data-item/index.vue'
import StatsGrid from '@/components/stats-grid/index.vue'
import DividerLine from '@/components/divider-line/index.vue'
import BackTop from '@/components/back-top/index.vue'
import { safeCallAll } from '@/utils/utils.js'

// ============ 模拟后端接口 ============
// 实际项目中替换为真实 API 调用
const mockApi = {
  // 获取 infra 成本汇总
  getInfraCost() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          summary: {
            cost: 40.81,        // 当月成本
            executedFee: 364.13 // 当年累计成本
          }
        })
      }, 200)
    })
  },
  
  // 获取 device 成本
  getDeviceCost() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          cost: 12.21,
          ttlCost: 153.13
        })
      }, 150)
    })
  },
  
  // 获取 network 成本
  getNetworkCost() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          cost: 8.45,
          ttlCost: 98.67
        })
      }, 180)
    })
  },
  
  // 获取 dc 成本
  getDcCost() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          cost: 20.15,
          ttlCost: 112.33
        })
      }, 160)
    })
  }
}

export default {
  name: 'OverviewView',
  components: {
    CardLayout,
    SubCard,
    CardTree,
    DataItem,
    StatsGrid,
    DividerLine,
    BackTop
  },
  data() {
    return {
      loading: false,
      // infra 成本汇总数据
      infraData: {
        cost: 0,
        ttlCost: 0
      },
      // card-tree 子项数据
      costChildren: []
    }
  },
  created() {
    this.fetchCostData()
  },
  methods: {
    // 并行请求所有成本数据
    async fetchCostData() {
      this.loading = true
      
      try {
        // 使用 safeCallAll 并行请求，出错返回默认值
        const [infraResult, deviceResult, networkResult, dcResult] = await safeCallAll([
          { promise: mockApi.getInfraCost(), defaultValue: { summary: { cost: 0, executedFee: 0 } } },
          { promise: mockApi.getDeviceCost(), defaultValue: { cost: 0, ttlCost: 0 } },
          { promise: mockApi.getNetworkCost(), defaultValue: { cost: 0, ttlCost: 0 } },
          { promise: mockApi.getDcCost(), defaultValue: { cost: 0, ttlCost: 0 } }
        ])
        
        // 转换数据格式
        this.transformData(infraResult, deviceResult, networkResult, dcResult)
        
      } catch (error) {
        console.error('获取成本数据失败:', error)
      } finally {
        this.loading = false
      }
    },
    
    // 数据转换
    transformData(infraResult, deviceResult, networkResult, dcResult) {
      // 转换 infra 汇总数据
      this.infraData = {
        cost: infraResult?.summary?.cost || 0,
        ttlCost: infraResult?.summary?.executedFee || 0
      }
      
      // 转换 card-tree 子项数据
      this.costChildren = [
        {
          name: 'IT设备成本',
          cost: deviceResult?.cost || 0,
          ttlCost: deviceResult?.ttlCost || 0,
          hasChidren: true,
          children: [
            {
              name: '网络设备成本',
              cost: 123,
              ttlCost: 456,
            }
          ]
        },
        {
          name: '网络线路成本',
          cost: networkResult?.cost || 0,
          ttlCost: networkResult?.ttlCost || 0
        },
        {
          name: '数据中心成本',
          cost: dcResult?.cost || 0,
          ttlCost: dcResult?.ttlCost || 0
        }
      ]
    },
    
    handleNavigate(cardName) {
      console.log(`点击了 ${cardName}`)
      this.$router.push({ 
        name: 'efficiency',
        query: { from: cardName }
      })
    },
    
    toggleItDevice() {
      // 展开/收起逻辑（如需要）
    }
  }
}
</script>

<style scoped>
.overview-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  background-color: #fff;
  padding: 16px;
  text-align: center;
  border-bottom: 1px solid #eee;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.header h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.content {
  padding: 16px;
  padding-top: 66px; /* 补偿 header fixed 脱离文档流 (50px header + 16px padding) */
  padding-bottom: 16px;
}

/* Card Layout 使用的样式 */
.content > :deep(.card-layout) {
  margin-bottom: 16px;
}
</style>
