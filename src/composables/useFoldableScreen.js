import { ref } from 'vue';

// 可配置阈值（通常折叠屏展开后宽度 > 600px）
const DEFAULT_EXPANDED_WIDTH = 600;

/**
 * 检测当前是否为折叠屏展开状态
 * @param {number} threshold - 展开状态阈值（像素），默认 600
 * @returns {boolean} 是否展开
 */
export function isFoldScreenExpanded(threshold = DEFAULT_EXPANDED_WIDTH) {
  return window.innerWidth > threshold;
}

/**
 * 折叠屏状态检测 Hook（仅在需要时手动调用检测）
 */
export function useFoldableScreen(threshold = DEFAULT_EXPANDED_WIDTH) {
  const isFoldExpanded = ref(isFoldScreenExpanded(threshold));

  return {
    isFoldExpanded,
    checkFoldState: () => {
      isFoldExpanded.value = isFoldScreenExpanded(threshold);
    }
  };
}

export default useFoldableScreen;