import { ref } from 'vue'
import { getRegionOptions } from './mock.js'

export function useRegionOptions() {
  const regionOptions = ref(null)
  const selectedRegionIds = ref([])
  const loadingRegions = ref(true)
  const regionError = ref('')

  async function fetchRegionOptions() {
    loadingRegions.value = true
    regionError.value = ''

    try {
      const res = await getRegionOptions()

      if (res.status === 403) {
        regionOptions.value = null
        selectedRegionIds.value = []
        regionError.value = '暂无 Region 筛选权限'
        return
      }

      if (res.status === 200) {
        regionOptions.value = res.data
        selectedRegionIds.value = res.data.map((option) => option.id)
        return
      }

      regionOptions.value = null
      selectedRegionIds.value = []
      regionError.value = 'Region 筛选项加载失败'
    } catch (error) {
      regionOptions.value = null
      selectedRegionIds.value = []
      regionError.value = 'Region 筛选项加载失败'
    } finally {
      loadingRegions.value = false
    }
  }

  fetchRegionOptions()

  return {
    regionOptions,
    selectedRegionIds,
    loadingRegions,
    regionError
  }
}
