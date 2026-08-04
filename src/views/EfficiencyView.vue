<template>
  <div class="efficiency-page">
    <!-- 顶部 Tab 导航（放在 header 里实现吸附） -->
    <div class="header">
      <van-tabs v-model:active="activeTab" @change="onTabChange">
        <van-tab title="IT设备" name="efficiency-it-device" />
        <van-tab title="网络设备" name="efficiency-network-device" />
        <van-tab title="网络线路" name="efficiency-network-line" />
        <van-tab title="数据中心" name="efficiency-data-center" />
      </van-tabs>
    </div>
    
    <!-- 子路由内容 - 数据准备好后再渲染 -->
    <div class="tab-content">
      <!-- 加载中状态 -->
      <div v-if="loading" class="loading-container">
        <van-loading type="spinner" color="#1989fa" size="36px" vertical>
          数据加载中...
        </van-loading>
      </div>
      
      <!-- 数据准备好后才渲染子路由 -->
      <router-view v-else-if="sharedData" v-slot="{ Component }">
        <keep-alive>
          <component 
            :is="Component" 
            :key="$route.name"
            :shared-data="sharedData"
            @refresh="fetchData"
          />
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
  name: 'EfficiencyView',
  components: {
    BackTop
  },
  data() {
    return {
      activeTab: 'efficiency-it-device',
      loading: false,
      sharedData: null // 从接口获取的数据
    }
  },
  created() {
    // 页面加载时请求接口
    this.fetchData()
  },
  watch: {
    $route: {
      handler(route) {
        if (route.name && route.name.startsWith('efficiency-')) {
          this.activeTab = route.name
        }
      },
      immediate: true
    }
  },
  methods: {
    // 请求接口数据
    async fetchData() {
      this.loading = true
      try {
        // TODO: 替换为真实接口
        // const res = await axios.get('/api/efficiency/data')
        // this.sharedData = res.data
        
        // 模拟接口请求
        await new Promise(resolve => setTimeout(resolve, 300))
        this.sharedData = {
          itDevice: { total: 1524211, online: 1421000 },
          networkDevice: { total: 467812, online: 443000 },
          networkLine: { total: 183275 },
          dataCenter: { total: 198, cabinets: 351521 }
        }
      } catch (error) {
        console.error('获取数据失败:', error)
      } finally {
        this.loading = false
      }
    },
    onTabChange(name) {
      if (this.$route.name !== name) {
        this.$router.push({ name })
      }
    }
  }
}
</script>

<style scoped>
.efficiency-page {
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

.tab-content {
  padding: 0.43rem;
  padding-top: calc(44px + 0.43rem); /* 补偿 header fixed 脱离文档流 */
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
</style>
