<template>
  <article class="usage-card">
    <div v-for="group in groups" :key="group.title" class="usage-group">
      <h3>
        <van-icon :name="group.icon" />
        {{ group.title }}
      </h3>
      <div class="usage-grid">
        <div v-for="item in group.items" :key="item.label" class="usage-track">
          <div class="usage-fill" :style="{ width: `${item.percent}%` }"></div>
          <span>{{ item.label }} {{ item.value }} {{ item.unit }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  groups: {
    type: Array,
    required: true
  }
})
</script>

<style lang="less" scoped>
.usage-card {
  display: flex;
  flex-direction: column;
  gap: .29rem;
  padding: .32rem .35rem;
  border: 1PX solid #e3e4ed;
  border-radius: .23rem;
  background: #fff;
}

.usage-group h3 {
  display: flex;
  align-items: center;
  gap: .13rem;
  margin-bottom: .19rem;
  color: #2b2254;
  font-size: .4rem;
}

.usage-group h3 .van-icon {
  color: #5c6bd0;
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: .24rem;
}

.usage-track {
  position: relative;
  height: .77rem;
  overflow: hidden;
  border-radius: .18rem;
  background: #f2f1f8;
}

.usage-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #d9e8ff 0%, #e8e4fb 100%);
}

.usage-track span {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2e2654;
  font-size: .34rem;
  font-weight: 700;
  white-space: nowrap;
}
</style>
