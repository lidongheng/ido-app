import { computed, onBeforeUnmount, ref } from 'vue';
import { useRoute } from 'vue-router';

const VIEWPORT_PADDING = 16;
const RECOMMENDATIONS_BY_ROUTE = {
  commonCompute: [
    '全国通算服务器有多少台？',
    '通算运营总量最高的客户有哪些？',
    '国内外 Region 的通算资源分布如何？'
  ],
  aiCompute: [
    '全国有多少智算卡？',
    '智算卡数量 Top20 客户有哪些？',
    '各 Region 的智算卡数量是多少？'
  ],
  Region: [],
  RegionDetail: [],
  resource: [
    '公有云当前有多少服务器？',
    '智算卡时使用率和 Token 利用率是多少？',
    'ECS、EVS、OBS 的资源使用情况如何？'
  ],
  dc: [
    '当前已投产多少园区和 DC？',
    'DC 已建机电与规划机电差距是多少？',
    '机柜、服务器和客户的使用情况如何？'
  ]
};

export function useAgentPanel() {
  const route = useRoute();
  const textareaRef = ref(null);
  const recommendations = computed(() => {
    return RECOMMENDATIONS_BY_ROUTE[route.name];
  });
  let visibilityFrameId = null;

  function keepComposerVisible() {
    const textarea = textareaRef.value;
    const visualViewport = window.visualViewport;
    if (!textarea || !visualViewport) {
      return;
    }

    const pageContent = textarea.closest('.page-content');
    if (!pageContent) {
      return;
    }

    const textareaRect = textarea.getBoundingClientRect();
    const visibleBottom = visualViewport.offsetTop + visualViewport.height;
    const hiddenHeight = textareaRect.bottom + VIEWPORT_PADDING - visibleBottom;
    if (hiddenHeight <= 0) {
      return;
    }

    pageContent.scrollTop += hiddenHeight;
  }

  function scheduleComposerVisibility() {
    if (visibilityFrameId !== null) {
      cancelAnimationFrame(visibilityFrameId);
    }

    visibilityFrameId = requestAnimationFrame(() => {
      visibilityFrameId = null;
      keepComposerVisible();
    });
  }

  function removeViewportListener() {
    if (!window.visualViewport) {
      return;
    }

    window.visualViewport.removeEventListener('resize', scheduleComposerVisibility);

    if (visibilityFrameId !== null) {
      cancelAnimationFrame(visibilityFrameId);
      visibilityFrameId = null;
    }
  }

  function handleComposerFocus() {
    if (!window.visualViewport) {
      return;
    }

    window.visualViewport.addEventListener('resize', scheduleComposerVisibility);
    scheduleComposerVisibility();
  }

  function handleComposerBlur() {
    removeViewportListener();
  }

  onBeforeUnmount(removeViewportListener);

  return {
    handleComposerBlur,
    handleComposerFocus,
    recommendations,
    textareaRef
  };
}
