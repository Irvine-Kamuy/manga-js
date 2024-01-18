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
  import { computed, defineComponent } from 'vue';
  import { storeToRefs } from 'pinia';
  
  import { useMangaStore } from '../stores/MangaStore'

  // components
  import MangaList from '../components/Manga/MangaList.vue'
  import { useRoute } from 'vue-router';


  export default defineComponent({
    components: { MangaList },
    setup() {
      const mangaStore = useMangaStore()

      const { manga, isLoading } = storeToRefs(mangaStore)
      const route = useRoute()
      const id = route.params.id
      
      console.log(id);
      //fetch manga
      mangaStore.getManga(id)

      

      return { manga, isLoading }
    }
  });
  </script>