<template>
  <router-view v-if="ready" />
</template>

<script setup>
import { useAppInitialization } from '@/composables/useAppInitialization.js';

const { ready } = useAppInitialization();
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
    'Microsoft YaHei', sans-serif;
  color: #241c4f;
  background: #f4f5f8;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

button,
input {
  font: inherit;
}

button {
  border: 0;
}

#app {
  width: 100%;
  max-width: 500PX;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 0 20PX rgba(24, 31, 54, 0.08);
}
</style>
