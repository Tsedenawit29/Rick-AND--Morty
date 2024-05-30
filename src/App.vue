<script setup>
import Home from './components/Home.vue'
// import Episode from './components/Episode.vue'
import {RouterView} from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {
  document.body.classList.add('bg-black');
});

onBeforeUnmount(() => {
  document.body.classList.remove('bg-black');
});
</script>

<template>
  <div id="app">
  <!-- <Home />
  <Episode /> -->
  <RouterView />
</div>
</template>


<style scoped>

</style>
