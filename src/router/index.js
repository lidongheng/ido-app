import { createRouter, createWebHashHistory } from 'vue-router'
import CloudOperationView from '../views/cloud-operation/CloudOperationView.vue'

// 旧版页面代码保留在 views 中，路由引用注释后不会进入生产构建。
// import OverviewView from '../views/OverviewView.vue'

const routes = [
  {
    path: '/',
    component: CloudOperationView,
    redirect: '/commonCompute',
    children: [
      {
        path: 'commonCompute',
        name: 'commonCompute',
        component: () => import('../views/cloud-operation/CommonComputeView.vue'),
        meta: {
          keepAlive: true,
          title: '通算'
        }
      },
      {
        path: 'aiCompute',
        name: 'aiCompute',
        component: () => import('../views/cloud-operation/AiComputeView.vue'),
        meta: {
          keepAlive: true,
          title: '智算'
        }
      },
      {
        path: 'Region',
        name: 'Region',
        component: () => import('../views/cloud-operation/RegionView.vue'),
        meta: {
          keepAlive: true,
          title: 'Region'
        }
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('../views/cloud-operation/ResourceView.vue'),
        meta: {
          keepAlive: true,
          title: '资源'
        }
      },
      {
        path: 'dc',
        name: 'dc',
        component: () => import('../views/cloud-operation/DcView.vue'),
        meta: {
          keepAlive: true,
          title: 'DC'
        }
      }
    ]
  }

  // 旧版路由保留备查，取消注释后才会重新进入构建。
  // {
  //   path: '/overview',
  //   name: 'overview',
  //   component: OverviewView,
  //   meta: {
  //     keepAlive: true,
  //     title: '总览'
  //   }
  // },
  // {
  //   path: '/cost',
  //   name: 'cost',
  //   component: () => import('../views/CostView.vue'),
  //   redirect: '/cost/it-device',
  //   meta: {
  //     keepAlive: true,
  //     title: '成本'
  //   },
  //   children: [
  //     {
  //       path: 'it-device',
  //       name: 'cost-it-device',
  //       component: () => import('../views/cost/ItDeviceView.vue'),
  //       meta: { title: 'IT设备', keepAlive: true }
  //     },
  //     {
  //       path: 'network-line',
  //       name: 'cost-network-line',
  //       component: () => import('../views/cost/NetworkLineView.vue'),
  //       meta: { title: '网络线路', keepAlive: true }
  //     },
  //     {
  //       path: 'data-center',
  //       name: 'cost-data-center',
  //       component: () => import('../views/cost/DataCenterView.vue'),
  //       meta: { title: '数据中心', keepAlive: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/efficiency',
  //   name: 'efficiency',
  //   component: () => import('../views/EfficiencyView.vue'),
  //   redirect: '/efficiency/it-device',
  //   meta: {
  //     keepAlive: true,
  //     title: '效率'
  //   },
  //   children: [
  //     {
  //       path: 'it-device',
  //       name: 'efficiency-it-device',
  //       component: () => import('../views/efficiency/ItDeviceView.vue'),
  //       meta: { title: 'IT设备', keepAlive: true }
  //     },
  //     {
  //       path: 'network-device',
  //       name: 'efficiency-network-device',
  //       component: () => import('../views/efficiency/NetworkDeviceView.vue'),
  //       meta: { title: '网络设备', keepAlive: true }
  //     },
  //     {
  //       path: 'network-line',
  //       name: 'efficiency-network-line',
  //       component: () => import('../views/efficiency/NetworkLineView.vue'),
  //       meta: { title: '网络线路', keepAlive: true }
  //     },
  //     {
  //       path: 'data-center',
  //       name: 'efficiency-data-center',
  //       component: () => import('../views/efficiency/DataCenterView.vue'),
  //       meta: { title: '数据中心', keepAlive: true }
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
