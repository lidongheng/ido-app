<template>
  <RegionDetailView :region-id="regionId" />
</template>

<script setup>
import RegionDetailView from '@/views/cloud-operation/RegionDetailView.vue';

defineProps({
  regionId: {
    type: String,
    required: true,
  },
});
</script>
