<template>
  <div class="bg-gray-900 text-green-300 min-h-screen">
    <Header />

    <main class="container mx-auto my-8 px-4 flex-grow">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Carousel -->
        <div class="md:order-2 swiper-container h-auto rounded-lg shadow-md">
          <div class="swiper-wrapper">
            <div v-for="(image, index) in carouselImages" :key="index" class="swiper-slide">
              <img :src="image" :alt="'carousel image ' + (index + 1)" class="w-full h-auto object-cover rounded-lg">
            </div>
          </div>
          <!-- Add pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <div class="md:order-1">
          <h1 class="text-3xl font-bold mb-4">Rick and Morty</h1>
          <p class="mb-4">
            "Rick and Morty" is an adult animated sci-fi sitcom about the misadventures of Rick Sanchez, a cynical mad scientist, and his anxious grandson, Morty Smith. They split their time between domestic life and interdimensional escapades, traveling across infinite realities, planets, and dimensions through portals and Rick's flying saucer. The show contrasts family drama with wild, often dangerous adventures led by Rick.
          </p>
          <div class="mb-4">
            <p><strong>Genre:</strong> Animation, Adventure, Sci-Fi</p>
            <p><strong>Creators:</strong> Justin Roiland, Dan Harmon</p>
            <p><strong>Stars:</strong> Justin Roiland, Chris Parnell, Spencer Grammer</p>
            <p><strong>Rating:</strong> <span class="text-yellow-400">★★★★★</span></p>
          </div>
        </div>
      </div>

      <!-- Episodes Section -->
      <div class="mb-8" id="episodes">
        <h2 class="text-2xl font-bold mb-4">Episodes ></h2>
        <div v-if="episodesError" class="text-red-500">Error fetching episodes: {{ episodesError.message }}</div>
        <div v-else-if="episodesLoading" class="text-blue-500">Loading episodes...</div>
        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <RouterLink v-for="(episode, index) in episodesToShow" :key="episode.id" :to="{ name: 'episode', params: { id: episode.id }, hash: `#episode-${episode.id}` }">
              <div class="p-4 bg-blue-800 bg-opacity-20 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105">
                <p class="text-white font-bold">{{ episode.name }}</p>
                <p class="text-gray-400">{{ episode.air_date }}</p>
                <p class="text-gray-400">{{ episode.episode }}</p>
              </div>
            </RouterLink>
          </div>
          <!-- Show More Button -->
          <div>
            <button v-if="!showAllEpisodes" @click="showAllEpisodes = true" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition duration-300">Show More</button>
            <!-- Return to Top Button -->
            <button v-else @click="scrollToTop('episodes')" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition duration-300">^</button>
          </div>
        </div>
      </div>

      <!-- Characters Section -->
      <div class="mb-8" id="characters">
        <h2 class="text-2xl font-bold mb-4">Characters ></h2>
        <div v-if="charactersError" class="text-red-500">Error fetching characters: {{ charactersError.message }}</div>
        <div v-else-if="charactersLoading" class="text-blue-500">Loading characters...</div>
        <div v-else class="flex flex-wrap justify-center space-x-4">
          <RouterLink v-for="(character, index) in charactersToShow" :key="character.id" :to="{ name: 'character', params: { id: character.id }, hash: `#character-${character.id}` }">
            <div class="group">
              <div class="character-item group-hover:scale-105 transform transition duration-300 ease-in-out">
                <img :src="character.image" :alt="character.name" class="h-32 w-48 object-cover rounded-lg shadow-md">
                <div class="text-center mt-2">
                  <span class="text-green-400 text-lg font-semibold">{{ character.name }}</span>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
        <div>
          <button v-if="!showAllCharacters" @click="showAllCharacters = true" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition duration-300">Show More</button>
          <button v-else @click="scrollToTop('characters')" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition duration-300">^</button>
        </div>
      </div>

      <!-- Locations Section -->
      <div class="mb-8" id="locations">
        <h2 class="text-2xl font-bold mb-4">Locations ></h2>
        <div v-if="locationsError" class="text-red-500">Error fetching locations: {{ locationsError.message }}</div>
        <div v-else-if="locationsLoading" class="text-blue-500">Loading locations...</div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <RouterLink v-for="(location, index) in locationsToShow" :key="location.id" :to="{ name: 'location', params: { id: location.id }, hash: `#location-${location.id}` }">
            <div class="group relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              <div class="h-auto bg-blue-800 bg-opacity-50 rounded-lg overflow-hidden relative">
                <div class="p-4 bg-gray-900 bg-opacity-75">
                  <h3 class="text-lg font-semibold text-white mb-2">{{ location.name }}</h3>
                  <p class="text-gray-300 mb-2">Dimension: {{ location.dimension }}</p>
                  <p class="text-gray-300 mb-2">Type: {{ location.type }}</p>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
        <div>
          <button v-if="!showAllLocations" @click="showAllLocations = true" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition duration-300">Show More</button>
          <button v-else @click="scrollToTop('locations')" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition duration-300">^</button>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, watchEffect, computed, onMounted } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import Swiper, { Autoplay, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import { RouterLink } from 'vue-router';
import Header from './Header.vue';
import Footer from './Footer.vue';

Swiper.use([Autoplay, Pagination]);

const carouselImages = [
  'https://c4.wallpaperflare.com/wallpaper/410/59/609/rick-and-morty-tv-rick-sanchez-morty-smith-wallpaper-preview.jpg',
  'https://images.alphacoders.com/133/1330376.png',
  'https://images7.alphacoders.com/133/1335145.jpg',
  'https://www.ripplejunction.com/media/wysiwyg/970x600_RM_General.png',
];

onMounted(() => {
  new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
});

// Define GraphQL queries
const GET_ALL_EPISODES = gql`
  query {
    episodes {
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

const GET_ALL_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

const GET_ALL_LOCATIONS = gql`
  query {
    locations {
      results {
        id
        name
        dimension
        type
      }
    }
  }
`;

// Fetch episodes data
const { result: episodesResult, loading: episodesLoading, error: episodesError } = useQuery(GET_ALL_EPISODES);

// Fetch characters data
const { result: charactersResult, loading: charactersLoading, error: charactersError } = useQuery(GET_ALL_CHARACTERS);

// Fetch locations data
const { result: locationsResult, loading: locationsLoading, error: locationsError } = useQuery(GET_ALL_LOCATIONS);

const episodes = ref([]);
const characters = ref([]);
const locations = ref([]);

const showAllEpisodes = ref(false);
const showAllCharacters = ref(false);
const showAllLocations = ref(false);

// Watch for changes in the query results and update the ref variables
watchEffect(() => {
  if (episodesResult.value?.episodes?.results) {
    episodes.value = episodesResult.value.episodes.results;
  }
  if (charactersResult.value?.characters?.results) {
    characters.value = charactersResult.value.characters.results;
  }
  if (locationsResult.value?.locations?.results) {
    locations.value = locationsResult.value.locations.results;
  }
});

const episodesToShow = computed(() => showAllEpisodes.value ? episodes.value : episodes.value.slice(0, 4));
const charactersToShow = computed(() => showAllCharacters.value ? characters.value : characters.value.slice(0, 4));
const locationsToShow = computed(() => showAllLocations.value ? locations.value : locations.value.slice(0, 4));

const scrollToTop = (section) => {
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
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

.carousel {
  width: 80%;
  margin: 0 auto;
}

.carousel img {
  width: 80%;
  height: auto;
}

.swiper-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.swiper-slide {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
