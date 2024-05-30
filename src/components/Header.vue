<template>
  <header class="bg-gray-800 p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white text-2xl font-bold flex items-center">
        <img src="../images/logo3.png" alt="Logo" class="h-10 mr-2">
        <a href="/" class="hover:text-green-300 transition duration-300">R&M</a>
      </div>
      <!-- Navigation -->
      <nav class="space-x-4 text-lg">
        <router-link :to="{ path: '/' }" class="text-white hover:text-green-300 transition duration-300">Home</router-link>
        <router-link :to="{ path: '/episodes' }" class="text-white hover:text-green-300 transition duration-300">Episodes</router-link>
        <router-link :to="{ path: '/characters' }" class="text-white hover:text-green-300 transition duration-300">Characters</router-link>
        <router-link :to="{ path: '/locations' }" class="text-white hover:text-green-300 transition duration-300">Locations</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
</style>
