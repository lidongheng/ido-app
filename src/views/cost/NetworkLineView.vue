<template>
  <div class="network-line-cost">
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
        <div class="summary-row">
          <div class="summary-item">
            <div class="value">12.65<span class="unit">亿元</span></div>
            <div class="label">当月成本</div>
          </div>
          <div class="summary-item">
            <div class="value">106.44<span class="unit">亿元</span></div>
            <div class="label">当年累计成本</div>
          </div>
        </div>
        
        <!-- 子项列表 -->
        <div v-if="networkLineExpanded" class="sub-items">
          <!-- 骨干线路 -->
          <sub-card
            title="骨干线路"
            icon="guide-o"
            :show-arrow="true"
          >
            <div class="data-grid">
              <div class="data-item">
                <div class="value">
                  <i class="status-dot green"></i>
                  2,156.32<span class="unit">元/条</span>
                </div>
                <div class="label">单位成本</div>
              </div>
              <div class="data-item">
                <div class="value">5.67<span class="unit">亿元</span></div>
                <div class="label">当月成本</div>
              </div>
              <div class="data-item">
                <div class="value">26,275<span class="unit">条</span></div>
                <div class="label">在线线路数</div>
              </div>
              <div class="data-item">
                <div class="value">48.91<span class="unit">亿元</span></div>
                <div class="label">当年累计成本</div>
              </div>
            </div>
          </sub-card>
          
          <!-- 城域线路 -->
          <sub-card
            title="城域线路"
            icon="location-o"
            :show-arrow="true"
          >
            <div class="data-grid">
              <div class="data-item">
                <div class="value">
                  <i class="status-dot orange"></i>
                  1,856.43<span class="unit">元/条</span>
                </div>
                <div class="label">单位成本</div>
              </div>
              <div class="data-item">
                <div class="value">4.17<span class="unit">亿元</span></div>
                <div class="label">当月成本</div>
              </div>
              <div class="data-item">
                <div class="value">22,468<span class="unit">条</span></div>
                <div class="label">在线线路数</div>
              </div>
              <div class="data-item">
                <div class="value">35.67<span class="unit">亿元</span></div>
                <div class="label">当年累计成本</div>
              </div>
            </div>
          </sub-card>
          
          <!-- 接入线路 -->
          <sub-card
            title="接入线路"
            icon="exchange"
            :show-arrow="true"
          >
            <div class="data-grid">
              <div class="data-item">
                <div class="value">
                  <i class="status-dot green"></i>
                  986.21<span class="unit">元/条</span>
                </div>
                <div class="label">单位成本</div>
              </div>
              <div class="data-item">
                <div class="value">2.81<span class="unit">亿元</span></div>
                <div class="label">当月成本</div>
              </div>
              <div class="data-item">
                <div class="value">28,532<span class="unit">条</span></div>
                <div class="label">在线线路数</div>
              </div>
              <div class="data-item">
                <div class="value">21.86<span class="unit">亿元</span></div>
                <div class="label">当年累计成本</div>
              </div>
            </div>
          </sub-card>
        </div>
      </sub-card>
    </card-layout>
  </div>
</template>

<script>
import CardLayout from '@/components/card-layout/index.vue'
import SubCard from '@/components/sub-card/index.vue'

export default {
  name: 'NetworkLineCostView',
  components: {
    CardLayout,
    SubCard
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
.network-line-cost {
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

:deep(.sub-card) {
  margin-bottom: 0.32rem;
}

:deep(.sub-card:last-child) {
  margin-bottom: 0;
}
</style>

