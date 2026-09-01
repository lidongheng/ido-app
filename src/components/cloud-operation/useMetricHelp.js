import { computed, onBeforeUnmount, ref } from 'vue';

// 多个指标共享当前打开项，切换问号时自动关闭上一个气泡。
const activeHelpId = ref(null);

export function useMetricHelp() {
  const helpId = Symbol('metric-help');
  const helpVisible = computed({
    get() {
      return activeHelpId.value === helpId;
    },
    set(value) {
      if (value) {
        activeHelpId.value = helpId;
        return;
      }

      if (activeHelpId.value === helpId) {
        activeHelpId.value = null;
      }
    },
  });

  onBeforeUnmount(() => {
    if (activeHelpId.value === helpId) {
      activeHelpId.value = null;
    }
  });

  return {
    helpVisible,
  };
}
