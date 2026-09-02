<template>
  <section
    class="agent-panel"
    :class="{ 'input-only': recommendations.length === 0 }"
    aria-label="运营 Agent"
  >
    <template v-if="recommendations.length">
      <div class="recommendation-header">
        <h2>为你推荐</h2>
        <div class="refresh-label">
          <van-icon name="replay" />
          <span>换一换</span>
        </div>
      </div>

      <div class="recommendation-list">
        <div
          v-for="recommendation in recommendations"
          :key="recommendation"
          class="recommendation-item"
        >
          {{ recommendation }}
        </div>
      </div>

      <div class="agent-sparkles" aria-hidden="true">
        <span class="sparkle-large">✦</span>
        <span class="sparkle-small">✦</span>
      </div>
    </template>

    <div class="agent-composer">
      <span class="camera-icon" aria-hidden="true"></span>
      <textarea
        ref="textareaRef"
        class="composer-input"
        rows="3"
        placeholder="请您描述问题或输入@选择技能"
        aria-label="请输入问题"
        @focus="handleComposerFocus"
        @blur="handleComposerBlur"
      ></textarea>
      <van-icon class="send-icon" name="guide-o" />
    </div>
  </section>
</template>

<script setup>
import { useAgentPanel } from './useAgentPanel.js';

const {
  handleComposerBlur,
  handleComposerFocus,
  recommendations,
  textareaRef
} = useAgentPanel();
</script>

<style lang="less" scoped>
.agent-panel {
  position: relative;
  min-height: 320px;
  padding: 22px 18px 18px;
  background: linear-gradient(180deg, #fff 0%, #f8faff 25%, #eef4fd 100%);
}

.agent-panel.input-only {
  min-height: 130px;
}

.recommendation-header {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #3d3958;
}

.recommendation-header h2 {
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
}

.refresh-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}

.refresh-label .van-icon {
  font-size: 19px;
}

.recommendation-list {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 12px;
  margin-top: 18px;
}

.recommendation-item {
  padding: 10px 15px;
  border: 1PX solid rgba(231, 235, 245, 0.9);
  border-radius: 9px;
  color: #494461;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 4px 14px rgba(74, 84, 120, 0.06);
  font-size: 14px;
  line-height: 20px;
}

.agent-sparkles {
  position: absolute;
  bottom: 125px;
  left: 21px;
  width: 22px;
  height: 24px;
  color: #1475d4;
}

.sparkle-large,
.sparkle-small {
  position: absolute;
  line-height: 1;
}

.sparkle-large {
  top: 0;
  left: 0;
  font-size: 18px;
}

.sparkle-small {
  right: 0;
  bottom: 0;
  font-size: 8px;
}

.agent-composer {
  position: absolute;
  right: 18px;
  bottom: 18px;
  left: 18px;
  height: 94px;
  border: 1PX solid rgba(224, 231, 244, 0.92);
  border-radius: 12px;
  background: rgba(247, 250, 255, 0.88);
  box-shadow: 0 6px 20px rgba(81, 97, 139, 0.06);
}

.composer-input {
  width: 100%;
  height: 100%;
  padding: 14px 48px 34px 46px;
  border: 0;
  border-radius: 12px;
  color: #494461;
  background: transparent;
  font-family: inherit;
  font-size: 16PX;
  line-height: 20px;
  resize: none;
  -webkit-appearance: none;
}

.composer-input::placeholder {
  color: #8e91a4;
  opacity: 1;
}

.camera-icon {
  position: absolute;
  z-index: 1;
  top: 17px;
  left: 15px;
  width: 22px;
  height: 17px;
  border: 2PX solid #56637e;
  border-radius: 4px;
  pointer-events: none;
}

.camera-icon::before {
  position: absolute;
  top: -5px;
  left: 4px;
  width: 8px;
  height: 4px;
  border: 2PX solid #56637e;
  border-bottom: 0;
  border-radius: 3px 3px 0 0;
  content: '';
}

.camera-icon::after {
  position: absolute;
  top: 3px;
  left: 6px;
  width: 6px;
  height: 6px;
  border: 2PX solid #56637e;
  border-radius: 50%;
  content: '';
}

.send-icon {
  position: absolute;
  right: 16px;
  bottom: 13px;
  color: #c6cfdf;
  font-size: 24px;
  transform: rotate(-8deg);
}
</style>
