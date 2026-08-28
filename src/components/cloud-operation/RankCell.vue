<template>
  <div class="rank-cell">
    <div class="rank-number" :class="{ 'medal-badge': rank <= 3 }">
      {{ formattedRank }}
    </div>
    <div v-if="movement !== undefined" class="rank-movement" :class="direction">
      <span class="movement-arrow">{{ direction === 'down' ? '↓' : '↑' }}</span>
      <span class="movement-val">{{ movement }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  rank: {
    type: Number,
    required: true,
  },
  movement: {
    type: Number,
    default: undefined,
  },
  direction: {
    type: String,
    default: 'up',
  },
});

const formattedRank = computed(() => {
  if (props.rank === 1) return '1st';
  if (props.rank === 2) return '2nd';
  if (props.rank === 3) return '3rd';
  return String(props.rank);
});
</script>

<style lang="less" scoped>
.rank-cell {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.rank-number {
  min-width: 22px;
  color: #353575;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  line-height: 16px;
}

.rank-number.medal-badge {
  padding: 1px 4px;
  border-radius: 4px;
  color: #fff;
  background: linear-gradient(135deg, #1c1836 0%, #3e365f 100%);
  box-shadow: 0 1px 3px rgba(35, 33, 77, 0.25);
  font-size: 10px;
  font-weight: 800;
  font-style: italic;
  letter-spacing: -0.5px;
}

.rank-movement {
  display: inline-flex;
  align-items: center;
  gap: 1px;
  font-size: 9px;
  font-weight: 600;
  line-height: 11px;
}

.rank-movement.up {
  color: #ef5370;
}

.rank-movement.down {
  color: #19bfa8;
}

.movement-arrow {
  font-size: 9px;
}
</style>
