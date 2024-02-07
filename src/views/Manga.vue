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
  
  // import {doc, getDoc} from 'firebase/firestore'
  // import { db } from '@/firebase';


  export default defineComponent({
    components: { MangaList },
    setup() {
      const mangaStore = useMangaStore()

      const { mangas, manga, isLoading } = storeToRefs(mangaStore)
      const route = useRoute()
      const id = route.params.id
      // const mm = ref({})
      console.log(id, manga.value, '123');

      // const test = async () => {
      //   const docRef = doc(db, 'mangas', id)
      //   const docc = await getDoc(docRef)
      //   mm.value = docc.data()
      //   console.log(mm.value, '12');
      // }
      // test()


      onMounted(async () => {
        try {
          await mangaStore.getMangas()
          await mangaStore.getManga(id)
        } catch (err) {
          console.error('Error fetching manga:', err)
        }
      }) 

      //why mangas re-render after editting but manga doesn't

      return { manga, isLoading }
    }
  });
  </script>