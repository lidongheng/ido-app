import { defineStore } from 'pinia';

export const useSelectedDc = defineStore('selectedDc', {
  state: () => ({
    dcIds: [],
    allMode: true
  })
});
