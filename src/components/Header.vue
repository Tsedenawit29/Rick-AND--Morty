<template>
  <header class="bg-gray-800 p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center">
        <img src="../images/logo3.png" alt="Logo" class="h-10 mr-2">
        <a href="/" class="text-white text-2xl font-bold hover:text-green-300 transition duration-300">R&M</a>
      </div>
      <div class="block md:hidden">
        <button @click="toggleMenu" class="text-white focus:outline-none">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <!-- Navigation menu -->
      <nav :class="{ 'hidden': !isMenuOpen }" class="md:flex md:items-center md:space-x-4 text-lg">
        <router-link :to="{ path: '/' }" class="block text-white hover:text-green-300 transition duration-300">Home</router-link>
        <router-link :to="{ path: '/episodes' }" class="block text-white hover:text-green-300 transition duration-300">Episodes</router-link>
        <router-link :to="{ path: '/characters' }" class="block text-white hover:text-green-300 transition duration-300">Characters</router-link>
        <router-link :to="{ path: '/locations' }" class="block text-white hover:text-green-300 transition duration-300">Locations</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<style scoped>
.container {
  max-width: 960px;
}
@media (max-width: 767px) {
  .container {
    padding: 0 1rem; 
  }
}
</style>
