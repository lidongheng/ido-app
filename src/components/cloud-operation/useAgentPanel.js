import { onBeforeUnmount, ref } from 'vue';

const VIEWPORT_PADDING = 16;

export function useAgentPanel() {
  const textareaRef = ref(null);
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
    textareaRef
  };
}
