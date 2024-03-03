<template>
    <div class="single-manga">
      <h1>Search Result</h1>
      <!-- loading -->
      <div class="loading" v-if="isLoading">Loading manga...</div>

      <!-- manga -->
      <div id="aManga">
        <div>
          <MangaList :manga="manga" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useMangaStore } from '../stores/MangaStore'
  import { useRoute } from 'vue-router';

  // components
  import MangaList from './MangaList.vue'
  
  export default defineComponent({
    components: { MangaList },
    setup() {
      const mangaStore = useMangaStore()

      const { mangas, manga, isLoading } = storeToRefs(mangaStore)
      const route = useRoute()
      const id = route.params.id
      console.log(id, manga.value, '123');

      onMounted(async () => {
        try {
          await mangaStore.getMangas()
          await mangaStore.getManga(id)
        } catch (err) {
          console.error('Error fetching manga:', err)
        }
      }) 

      return { manga, isLoading }
    }
  });
  </script>