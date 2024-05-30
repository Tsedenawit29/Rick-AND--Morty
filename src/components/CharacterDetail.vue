<template>
    <div class="bg-gray-900 text-green-300 min-h-screen flex flex-col">
      <Header />
      <main class="container mx-auto my-8 px-4 flex-grow">
        <div v-if="characterError" class="text-red-500">Error fetching character: {{ characterError.message }}</div>
        <div v-else-if="characterLoading" class="text-blue-500">Loading character...</div>
        <div v-else>
          <div class="flex flex-col md:flex-row items-center md:items-start">
            <img :src="character.image" :alt="character.name" class="w-64 h-64 object-cover rounded-lg shadow-md mb-4 md:mb-0 md:mr-8">
            <div class="text-center md:text-left">
              <h1 class="text-3xl font-bold mb-4">{{ character.name }}</h1>
              <p class="text-xl"><strong>Status:</strong> {{ character.status }}</p>
              <p class="text-xl"><strong>Species:</strong> {{ character.species }}</p>
              <p class="text-xl"><strong>Gender:</strong> {{ character.gender }}</p>
              <p class="text-xl"><strong>Origin:</strong> {{ character.origin.name }}</p>
              <p class="text-xl"><strong>Location:</strong> {{ character.location.name }}</p>
            </div>
          </div>
          <div class="mt-8">
            <h2 class="text-2xl font-bold mb-4">Episodes</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="episode in character.episode" :key="episode.id" class="bg-gray-800 p-4 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105">
                <router-link :to="{ name: 'episode', params: { id: episode.id } }" class="block text-lg text-green-300 hover:underline">
                  {{ episode.name }}
                </router-link>
                <p class="text-gray-400 text-sm">{{ episode.air_date }}</p>
                <p class="text-gray-400 text-sm">{{ episode.episode }}</p>
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
const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`;

// Fetch character data
const { result: characterResult, loading: characterLoading, error: characterError } = useQuery(GET_CHARACTER, { id: route.params.id });

const character = ref(null);

watchEffect(() => {
  if (characterResult.value?.character) {
    character.value = characterResult.value.character;
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

.character-item {
  transition: transform 0.2s;
}

.character-item:hover {
  transform: scale(1.05);
}

.episode-item {
  transition: transform 0.2s;
}

.episode-item:hover {
  transform: scale(1.05);
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
  