<template>
    <div class="collection">
      <h1>Collection</h1>
      <div class="scroll">
        <ScrollToBottom />
      </div>
      <!-- search -->
      <Search :mangas="mangas" />
      <!-- filter -->
      <nav class="filter">
        <button @click="filter = 'all'">All mangas</button>
        <button @click="filter = 'updating'">Updating</button>
        <button @click="filter = 'end'">End</button>
        <button @click="filter = 'abandoned'">Abandonned</button>
      </nav>
      <!-- loading -->
      <div class="loading" v-if="isLoading">Loading mangas...</div>

      <!-- manga list -->
      <div class="manga-list" v-if="filter === 'all'">
        <p>{{ totalCount }} mangas in the collection</p>
        <div v-for="manga in mangas" :key="manga.id">
          <MangaList :manga="manga" />
        </div>
      </div>
      <div class="manga-list" v-if="filter === 'updating'">
        <p>{{ updatingCount }} mangas in the collection are still updating</p>
        <div v-for="manga in updating" :key="manga.id">
          <MangaList :manga="manga" />
        </div>
      </div>
      <div class="manga-list" v-if="filter === 'end'">
        <p>{{ endCount }} mangas in the collection are end</p>
        <div v-for="manga in end" :key="manga.id">
          <MangaList :manga="manga" />
        </div>
      </div>
      <div class="manga-list" v-if="filter === 'abandoned'">
        <p>{{ abandonedCount }} mangas in the collection that I won't keep on purchasing</p>
        <div v-for="manga in abandoned" :key="manga.id">
          <MangaList :manga="manga" />
        </div>
      </div>
      <!-- new manga form -->
      <div class="new-manga-form">
        <MangaAddForm />
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  
  import { useMangaStore } from '../stores/MangaStore'
  import {doc, getDoc} from 'firebase/firestore'
  import { db } from '@/firebase';

  // components
  import MangaList from '@/views/MangaList.vue';
  import MangaAddForm from '../components/Manga/MangaAddForm.vue'
  import ScrollToBottom from '../components/ScrollToBottom.vue'
  import Search from '../components/Search.vue'


  export default defineComponent({
    name: 'Collection',
    components: { MangaList, MangaAddForm, ScrollToBottom, Search },
    setup() {
      const mangaStore = useMangaStore()

      const { mangas, isLoading, totalCount, updating, updatingCount, end, endCount, abandoned, abandonedCount } = storeToRefs(mangaStore)

      //fetch mangas
      mangaStore.getMangas()

      const filter = ref('all')


      return { mangas, isLoading, totalCount, updating, updatingCount, end, endCount, abandoned, abandonedCount, filter }
    }
  });
  </script>