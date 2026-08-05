import { defineStore } from 'pinia'

export const useSelectedRegion = defineStore('selectedRegion', {
  state: () => ({
    regionIds: []
  })
})
