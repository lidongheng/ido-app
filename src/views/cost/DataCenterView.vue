<template>
  <div class="data-center-cost">
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
        <div class="summary-row">
          <div class="summary-item">
            <div class="value">17.34<span class="unit">亿元</span></div>
            <div class="label">当月成本</div>
          </div>
          <div class="summary-item">
            <div class="value">135.52<span class="unit">亿元</span></div>
            <div class="label">当年累计成本</div>
          </div>
        </div>
        
        <!-- 子项列表 -->
        <div v-if="dataCenterExpanded" class="sub-items">
          <!-- 自建数据中心 -->
          <sub-card
            title="自建数据中心"
            icon="hotel-o"
            :show-arrow="true"
          >
            <div class="data-grid">
              <div class="data-item">
                <div class="value">
                  <i class="status-dot green"></i>
                  8,256.32<span class="unit">元/机柜</span>
                </div>
                <div class="label">单位成本</div>
              </div>
              <div class="data-item">
                <div class="value">9.67<span class="unit">亿元</span></div>
                <div class="label">当月成本</div>
              </div>
              <div class="data-item">
                <div class="value">11,708<span class="unit">机柜</span></div>
                <div class="label">在线机柜数</div>
              </div>
              <div class="data-item">
                <div class="value">78.91<span class="unit">亿元</span></div>
                <div class="label">当年累计成本</div>
              </div>
            </div>
          </sub-card>
          
          <!-- 租赁数据中心 -->
          <sub-card
            title="租赁数据中心"
            icon="shop-o"
            :show-arrow="true"
          >
            <div class="data-grid">
              <div class="data-item">
                <div class="value">
                  <i class="status-dot orange"></i>
                  6,856.43<span class="unit">元/机柜</span>
                </div>
                <div class="label">单位成本</div>
              </div>
              <div class="data-item">
                <div class="value">5.17<span class="unit">亿元</span></div>
                <div class="label">当月成本</div>
              </div>
              <div class="data-item">
                <div class="value">7,543<span class="unit">机柜</span></div>
                <div class="label">在线机柜数</div>
              </div>
              <div class="data-item">
                <div class="value">38.67<span class="unit">亿元</span></div>
                <div class="label">当年累计成本</div>
              </div>
            </div>
          </sub-card>
          
          <!-- 合建数据中心 -->
          <sub-card
            title="合建数据中心"
            icon="friends-o"
            :show-arrow="true"
          >
            <div class="data-grid">
              <div class="data-item">
                <div class="value">
                  <i class="status-dot green"></i>
                  5,986.21<span class="unit">元/机柜</span>
                </div>
                <div class="label">单位成本</div>
              </div>
              <div class="data-item">
                <div class="value">2.50<span class="unit">亿元</span></div>
                <div class="label">当月成本</div>
              </div>
              <div class="data-item">
                <div class="value">4,176<span class="unit">机柜</span></div>
                <div class="label">在线机柜数</div>
              </div>
              <div class="data-item">
                <div class="value">17.94<span class="unit">亿元</span></div>
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
  name: 'DataCenterCostView',
  components: {
    CardLayout,
    SubCard
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
.data-center-cost {
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

