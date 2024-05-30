<template>
   <div class="bg-gray-900 text-green-300 min-h-screen">
<Header />
  <main class="mx-auto my-9 p-4 bg-gray-900 shadow-md rounded-lg">
    <h2 class="text-2xl text-green-500 font-bold mb-4">Locations ></h2>
      <div class="container mx-auto p-4">
        <div v-if="error" class="text-red-500">Something went wrong...</div>
        <div v-if="loading" class="text-blue-500">Loading...</div>
        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="location in locations" :key="location.id" class="location-box bg-green-100 rounded-lg shadow-md">
              <div class="p-4 border-b border-gray-300">
                <h1 class="text-2xl font-bold text-gray-800">{{ location.name }}</h1>
                <p class="text-sm text-gray-600"><strong>Type:</strong> {{ location.type }}</p>
                <p class="text-sm text-gray-600"><strong>Dimension:</strong> {{ location.dimension }}</p>
                <p class="text-sm text-gray-600"><strong>Created:</strong> {{ location.created }}</p>
              </div>
              <div class="p-4">
                <h2 class="text-lg font-semibold mb-2">Residents</h2>
                <div>
                  <div v-if="!location.showAllResidents">
                    <div v-for="(resident, index) in location.residents.slice(0, 3)" :key="resident.id" class="mb-4 flex items-center space-x-4">
                      <img :src="resident.image" :alt="resident.name" class="w-12 h-12 rounded-full object-cover object-center">
                      <div>
                        <h3 class="text-lg font-semibold text-gray-800">{{ resident.name }}</h3>
                        <p class="text-sm text-gray-600"><strong>Status:</strong> {{ resident.status }}</p>
                        <p class="text-sm text-gray-600"><strong>Species:</strong> {{ resident.species }}</p>
                        <p class="text-sm text-gray-600"><strong>Gender:</strong> {{ resident.gender }}</p>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div v-for="resident in location.residents" :key="resident.id" class="mb-4 flex items-center space-x-4">
                      <img :src="resident.image" :alt="resident.name" class="w-12 h-12 rounded-full object-cover object-center">
                      <div>
                        <h3 class="text-lg font-semibold text-gray-800">{{ resident.name }}</h3>
                        <p class="text-sm text-gray-600"><strong>Status:</strong> {{ resident.status }}</p>
                        <p class="text-sm text-gray-600"><strong>Species:</strong> {{ resident.species }}</p>
                        <p class="text-sm text-gray-600"><strong>Gender:</strong> {{ resident.gender }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button @click="toggleResidents(location)" class="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-300" :style="{ height: location.residents.length > 10 ? 'auto' : '2rem' }">
                  {{ location.showAllResidents ? 'Show Less' : 'Show All Residents' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useQuery } from '@vue/apollo-composable';
  import gql from 'graphql-tag';
  import Header from './Header.vue'
  import Footer from './Footer.vue'
  const LOCATIONS_QUERY = gql`
    query Locations {
      locations {
        results {
          id
          name
          type
          dimension
          created
          residents {
            id
            name
            status
            species
            gender
            image
          }
        }
      }
    }
  `;
  
  const { result, loading, error } = useQuery(LOCATIONS_QUERY);
  const locations = ref([]);
  
  watch(result, (newResult) => {
    if (newResult && newResult.locations) {
      locations.value = newResult.locations.results.map(location => ({
        ...location,
        showAllResidents: false
      }));
    }
  });
  
  const toggleResidents = (location) => {
    location.showAllResidents = !location.showAllResidents;
  }
  </script>
  
  <style scoped>
  .location-box {
    border: 2px solid #42dca3;
  }
  
  .location-box:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
  </style>
  