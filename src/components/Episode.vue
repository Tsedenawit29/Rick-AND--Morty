<template>
  
  <div class="bg-gray-900 text-black min-h-screen">
    <Header />
  <main class="mx-auto my-9 p-4 bg-black-800 shadow-md rounded-lg">
    <h2 class="text-2xl text-green-500 font-bold mb-4">Episodes ></h2>
    <div class="container mx-auto p-4">
      <div v-if="error" class="text-red-500">Something went wrong...</div>
      <div v-if="loading" class="text-blue-500">Loading...</div>
      <div v-else>
        <div v-for="(episode, index) in episodes" :key="episode.id" class="mb-8 p-4 bg-green-100 rounded-lg shadow-md">
          <h1 class="text-2xl font-bold">{{ episode.name }}</h1>
          <p><strong>Air Date:</strong> {{ episode.air_date }}</p>
          <p><strong>Episode:</strong> {{ episode.episode }}</p>
          <p><strong>Created:</strong> {{ episode.created }}</p>

          <h2 class="text-xl font-semibold mb-4 mt-4">Characters</h2>
          <!-- Image Carousel -->
          <div :class="`swiper-container swiper-container-${index}`">
            <div class="swiper-wrapper">
              <div v-for="character in episode.characters" :key="character.id" class="swiper-slide bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <img :src="character.image" :alt="character.name" class="w-24 h-24 rounded-full mb-4" />
                <p class="font-semibold">{{ character.name }}</p>
                <p><strong>Status:</strong> {{ character.status }}</p>
                <p><strong>Species:</strong> {{ character.species }}</p>
                <p><strong>Gender:</strong> {{ character.gender }}</p>
                <button class="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700">View Details</button>
              </div>
            </div>
            <!-- Pagination -->
            <div :class="`swiper-pagination swiper-pagination-${index}`"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</div>
</template>
<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import Swiper, { Autoplay, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import Header from './Header.vue'
import Footer from './Footer.vue'

const EPISODES_QUERY = gql`
  query Episodes {
    episodes {
      results {
        id
        name
        air_date
        episode
        created
        characters {
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

const { result, loading, error } = useQuery(EPISODES_QUERY);

const episodes = ref([]);

watch(result, async (newResult) => {
  if (newResult && newResult.episodes) {
    episodes.value = newResult.episodes.results;
    await nextTick(); 
    initializeSwipers();
  }
});

const initializeSwipers = () => {
  episodes.value.forEach((episode, index) => {
    new Swiper(`.swiper-container-${index}`, {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: `.swiper-pagination-${index}`,
        clickable: true,
      },
    });
  });
};

onMounted(async () => {
  if (episodes.value.length > 0) {
    await nextTick();
    initializeSwipers();
  }
});
</script>
