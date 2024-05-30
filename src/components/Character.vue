<template>
   <div class="bg-gray-900 text-green-300 min-h-screen">
    <Header />
    <main class="container mx-auto my-8 px-4 flex-grow">
      <h2 class="text-2xl text-green-400 font-bold mb-4">Characters ></h2>
      <div class="container mx-auto p-4">
        <div v-if="error" class="text-red-500">Something went wrong...</div>
        <div v-if="loading" class="text-blue-500">Loading...</div>
        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div v-for="character in characters" :key="character.id"
                 :class="['bg-gray-900 rounded-lg shadow-md border-2 border-green-400', {'h-auto': character.showEpisodes}]">
              <div class="p-4 flex flex-col bg-gray-800 text-green-100 border-b border-gray-700">
                <img :src="character.image" :alt="character.name" class="w-20 h-20 rounded-full object-cover object-center mx-auto hover:scale-105 transition-transform">
                <div class="mt-4 text-center">
                  <h1 class="text-lg font-bold text-green-400">{{ character.name }}</h1>
                  <p><strong>Status:</strong> {{ character.status }}</p>
                  <p><strong>Species:</strong> {{ character.species }}</p>
                  <p><strong>Gender:</strong> {{ character.gender }}</p>
                </div>
                <button @click="toggleEpisodes(character)" class="mt-4 text-sm bg-green-400 text-white px-3 py-1 rounded-lg hover:bg-green-500 transition-colors duration-300">
                  {{ character.showEpisodes ? '^' : 'Episodes >' }}
                </button>
              </div>
              <div class="p-4" v-if="character.showEpisodes">
                <h2 class="text-lg font-semibold mb-2 text-white">Episodes Participated</h2>
                <div v-for="episode in character.episode" :key="episode.id" class="mb-2 bg-gray-800 p-3 rounded-lg shadow-inner">
                  <h3 class="text-md font-semibold text-green-300">{{ episode.name }}</h3>
                  <p class="text-gray-300"><strong>Air Date:</strong> {{ episode.air_date }}</p>
                  <p class="text-gray-300"><strong>Episode:</strong> {{ episode.episode }}</p>
                  <p class="text-gray-300"><strong>Created:</strong> {{ episode.created }}</p>
                </div>
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

const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      results {
        id
        name
        status
        species
        gender
        image
        origin {
          name
        }
        location {
          name
        }
        episode {
          id
          name
          air_date
          episode
          created
        }
      }
    }
  }
`;

const { result, loading, error } = useQuery(CHARACTERS_QUERY);
const characters = ref([]);

watch(result, (newResult) => {
  if (newResult && newResult.characters) {
    characters.value = newResult.characters.results.map(character => ({
      ...character,
      showEpisodes: false
    }));
  }
});

const toggleEpisodes = (character) => {
  character.showEpisodes = !character.showEpisodes;
};
</script>
