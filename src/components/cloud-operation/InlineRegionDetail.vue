<template>
  <RegionDetailView :regionName="regionName" />
</template>

<script setup>
import RegionDetailView from '@/views/cloud-operation/RegionDetailView.vue';

const props = defineProps({
  regionName: {
    type: String,
    required: true,
  },
});
</script>
