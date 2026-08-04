import { ref, watch } from 'vue'
import { getResourceOverview } from './mock.js'

export function useResourceOverview(filters) {
  const loading = ref(true)
  const errorMessage = ref('')
  const pageData = ref(null)
  let requestSequence = 0

  async function fetchData() {
    const sequence = ++requestSequence
    loading.value = true
    errorMessage.value = ''

    try {
      const res = await getResourceOverview(filters.value)

      // 用户连续调整筛选时，只接收最后一次请求的结果。
      if (sequence !== requestSequence) {
        return
      }

      if (res.status === 403) {
        pageData.value = null
        errorMessage.value = '暂无资源数据查看权限'
        return
      }

      if (res.status === 200) {
        pageData.value = res.data
        return
      }

      pageData.value = null
      errorMessage.value = '资源数据加载失败'
    } catch (error) {
      if (sequence === requestSequence) {
        pageData.value = null
        errorMessage.value = '资源数据加载失败'
      }
    } finally {
      if (sequence === requestSequence) {
        loading.value = false
      }
    }
  }

  watch(filters, fetchData, {
    deep: true,
    immediate: true
  })

  return {
    loading,
    errorMessage,
    pageData
  }
}
