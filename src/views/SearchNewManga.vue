<template>
  <div class="search-new-manga">
    <h1>Search</h1>
    <form @submit.prevent="searchMangas">
      <input 
        type="text" 
        placeholder="search manga..."
        v-model="search"
        @input="handleInput">
      <button type="submit">Search</button>
    </form>
    <div class="results" v-if="search_results.length > 0">
      <div class="result" v-for="m in search_results" :key="m.mal_id">
        <div class="result-left">
          <a :href="m.url"><img :src="m.images.jpg.image_url" alt="manga image" ></a>
          <h3>{{ m.title }}</h3>
        </div>
        <div class="result-right">
          <p :title="m.synopsis" v-if="m.sypnosis">
            {{ m.synopsis.slice(0, 150) }}...
          </p>
          <div class="background">
            <p>{{ m.background ? m.background : 'No backgound story was found...' }}</p>
          </div>
        </div>

      
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { computed, defineComponent, ref } from 'vue';
  export default defineComponent({
    name: 'Search New Manga',
    setup() {
      const search = ref('')
      const my_manga = ref([])
      const search_results = ref([]) 

      const my_manga_asc = computed(() => {
        return my_manga.value.sort((a, b) => {
          return a.title.localecompare(b.title)
        })
      })

      const searchMangas = async () => {
            const url = await fetch(`https://api.jikan.moe/v4/manga?q=${search.value}`)
            const res = await url.json()
            search_results.value = res.data

            if(res.error) {
                console.log((res.error));
            }
      }
      const handleInput = e => {
        if (!e.target.value) {
          search_results.value = []
        }
      }

      return { search, search_results, searchMangas, handleInput, }
    }
  });
  </script>
  