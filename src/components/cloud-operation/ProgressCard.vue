<template>
  <article class="progress-card">
    <header class="progress-header">
      <span class="progress-title">
        <van-icon :name="group.icon" />
        {{ group.title }}<span v-if="group.subtitle" class="progress-subtitle">（{{ group.subtitle }}）</span>
      </span>
      <span class="progress-status">{{ group.status }}</span>
    </header>

    <div class="progress-rows">
      <div v-for="row in group.rows" :key="row.label" class="progress-row">
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: `${row.percent}%` }"></div>
          <span class="progress-value">{{ row.label }} {{ row.value }} {{ row.unit }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  group: {
    type: Object,
    required: true
  }
})
</script>

<style lang="less" scoped>
.progress-card {
  padding: 10px 13px 13px;
  border: 1PX solid #e3e4ed;
  border-radius: 9px;
  background: #fff;
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 9px;
}

.progress-title {
  display: flex;
  align-items: center;
  color: #2d2455;
  font-size: 15px;
  font-weight: 700;
}

.progress-title .van-icon {
  margin-right: 5px;
  color: #5d6dd1;
}

.progress-subtitle {
  color: #777187;
  font-size: 13px;
  font-weight: 400;
}

.progress-status {
  color: #51488d;
  font-size: 13px;
  font-weight: 600;
}

.progress-rows {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.progress-track {
  position: relative;
  height: 31px;
  overflow: hidden;
  border-radius: 7px;
  background: #f2f1f8;
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #d9e7ff 0%, #ece7fb 100%);
}

.progress-value {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #28204f;
  font-size: 14px;
  font-weight: 700;
}
</style>
