<template>
    <div class="bg-gray-900 text-green-300 min-h-screen flex flex-col">
      <Header />
      <main class="container mx-auto my-8 px-4 flex-grow">
        <div v-if="locationError" class="text-red-500">Error fetching location: {{ locationError.message }}</div>
        <div v-else-if="locationLoading" class="text-blue-500">Loading location...</div>
        <div v-else>
          <div class="flex flex-col md:flex-row items-center md:items-start">
            <div class="text-center md:text-left">
              <h1 class="text-3xl font-bold mb-4">{{ location.name }}</h1>
              <p class="text-xl"><strong>Type:</strong> {{ location.type }}</p>
              <p class="text-xl"><strong>Dimension:</strong> {{ location.dimension }}</p>
              <p class="text-xl"><strong>Residents:</strong> {{ location.residents.length }}</p>
            </div>
          </div>
          <div class="mt-8">
            <h2 class="text-2xl font-bold mb-4">Residents</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="resident in location.residents" :key="resident.id" class="bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4">
                <img :src="resident.image" :alt="resident.name" class="w-16 h-16 object-cover rounded-full">
                <router-link :to="`/character/${resident.id}`" class="text-lg text-green-300 hover:underline">
                  {{ resident.name }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </template>
<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import Header from './Header.vue';
import Footer from './Footer.vue';

const route = useRoute();

// Define GraphQL query
const GET_LOCATION = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents {
        id
        name
        image
      }
    }
  }
`;

// Fetch location data
const { result: locationResult, loading: locationLoading, error: locationError } = useQuery(GET_LOCATION, { id: route.params.id });

const location = ref(null);

watchEffect(() => {
  if (locationResult.value?.location) {
    location.value = locationResult.value.location;
  }
});
</script>
<style scoped>
.main-container {
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
}

.resident-card {
  transition: transform 0.2s;
}

.resident-card:hover {
  transform: scale(1.05);
}
</style>
  