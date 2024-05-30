<template>
    <div class="bg-gray-900 text-green-300 min-h-screen flex flex-col">
      <Header />
      <main class="container mx-auto my-8 px-4 flex-grow">
        <div v-if="episodeError" class="text-red-500">Error fetching episode: {{ episodeError.message }}</div>
        <div v-else-if="episodeLoading" class="text-blue-500">Loading episode...</div>
        <div v-else>
          <div class="bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 class="text-4xl font-bold mb-4">{{ episode.name }}</h1>
            <div class="text-lg mb-6">
              <p><strong>Air Date:</strong> {{ episode.air_date }}</p>
              <p><strong>Episode:</strong> {{ episode.episode }}</p>
            </div>
            <h2 class="text-2xl font-bold mb-4">Characters in this episode:</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <RouterLink
                v-for="character in episode.characters"
                :key="character.id"
                :to="{ name: 'character', params: { id: character.id } }"
                class="bg-gray-700 rounded-lg p-4 transition transform hover:scale-105"
              >
                <img
                  :src="character.image"
                  :alt="character.name"
                  class="h-48 w-full object-cover rounded-t-lg mb-2"
                />
                <div class="text-center">
                  <span class="text-green-300 text-lg font-semibold">{{ character.name }}</span>
                </div>
              </RouterLink>
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

const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        image
      }
    }
  }
`;

const { result: episodeResult, loading: episodeLoading, error: episodeError } = useQuery(GET_EPISODE, { id: route.params.id });

const episode = ref(null);

watchEffect(() => {
  if (episodeResult.value?.episode) {
    episode.value = episodeResult.value.episode;
  }
});
</script>
<style scoped>
.character-item {
  cursor: pointer;
}

.character-item:hover {
  filter: brightness(110%);
}

.character-item:hover img {
  transform: scale(1.05);
}

.transition {
  transition: all 0.2s;
}

.transform {
  transform: scale(1);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
  