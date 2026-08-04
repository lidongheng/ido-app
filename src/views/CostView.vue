<template>
  <div class="cost-page">
    <!-- 顶部 Tab 导航（放在 header 里实现吸附） -->
    <div class="header">
      <van-tabs v-model:active="activeTab" @change="onTabChange">
        <van-tab title="IT设备" name="cost-it-device" />
        <van-tab title="网络线路" name="cost-network-line" />
        <van-tab title="数据中心" name="cost-data-center" />
      </van-tabs>
    </div>
    
    <!-- 图例说明 -->
    <div class="legend">
      <span class="legend-item">
        <i class="dot green"></i>单位成本环比≤0
      </span>
      <span class="legend-item">
        <i class="dot orange"></i>0&lt;单位成本环比≤10%
      </span>
      <span class="legend-item">
        <i class="dot red"></i>单位成本环比&gt;10%
      </span>
    </div>
    
    <!-- 子路由内容 -->
    <div class="tab-content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.name" />
        </keep-alive>
      </router-view>
    </div>

    <!-- 回到顶部按钮 -->
    <back-top :visibility-height="300" bottom="120px" />
  </div>
</template>

<script>
import BackTop from '@/components/back-top/index.vue'

export default {
  name: 'CostView',
  components: {
    BackTop
  },
  data() {
    return {
      activeTab: 'cost-it-device'
    }
  },
  watch: {
    $route: {
      handler(route) {
        if (route.name && route.name.startsWith('cost-')) {
          this.activeTab = route.name
        }
      },
      immediate: true
    }
  },
  methods: {
    onTabChange(name) {
      if (this.$route.name !== name) {
        this.$router.push({ name })
      }
    }
  }
}
</script>

<style scoped>
.cost-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

/* Tab 样式 */
:deep(.van-tabs) {
  background: #fff;
}

:deep(.van-tabs__nav) {
  background: #fff;
}

:deep(.van-tab) {
  font-size: 0.43rem;
}

:deep(.van-tab--active) {
  color: #1989fa;
  font-weight: 600;
}

:deep(.van-tabs__line) {
  background: #1989fa;
  height: 3px;
  border-radius: 2px;
}

/* 图例样式 */
.legend {
  margin-top: 44px; /* 补偿 header fixed 脱离文档流 */
  display: flex;
  flex-wrap: wrap;
  gap: 0.32rem;
  padding: 0.32rem 0.43rem;
  background: #fff;
  font-size: 0.32rem;
  color: #666;
  border-bottom: 1px solid #ebedf0;
}

.legend-item {
  display: flex;
  align-items: center;
}

.dot {
  width: 0.21rem;
  height: 0.21rem;
  border-radius: 50%;
  margin-right: 0.11rem;
}

.dot.green {
  background: #07c160;
}

.dot.orange {
  background: #ff976a;
}

.dot.red {
  background: #ee0a24;
}

.tab-content {
  padding: 0.43rem;
}
</style>
