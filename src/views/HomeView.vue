<template>
  <div class="home">
    <h1>Random Recommendation</h1>
    <div class="rec">
      <div class="rec-left">
        <a :href="rec.url"><img :src="rec.img"></a> 
      </div>
      <div class="rec-right">
        <h3>{{ rec.title }} <span>{{ rec.titleJp }}</span></h3>
        <p v-for="a in rec.authors" :key="a.mal_id" class="rec-authors">{{ a.name }}</p>
        <div class="genres">
        <p v-for="g in rec.genres" :key="g.mal_id">{{ g.name }}</p>
        </div>
        <p>background story: {{ rec.bgStory ? rec.bgStory : "no background story is found"}}</p>
      </div>
    </div>
    
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';

import { useMangaStore } from '../stores/MangaStore'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const mangaStore = useMangaStore() 
    mangaStore.getHomePageImg()
    const { rec } = storeToRefs(mangaStore)

    return { rec }
  }
});
</script>


