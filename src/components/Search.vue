<template>
  <div class="search">
    <input type="text" v-model="search" placeholder="search the manga here...">
    <ul>
        <router-link v-if="search" v-for="m in searchManga" :key="m" :to="{name: 'single manga', params: {id: m.id}}">
            <li class="search-result">{{ m.title }}</li> 
        </router-link>
        
    </ul>
  </div>
</template>

<script>
import { computed, ref, watch, watchEffect } from 'vue';

export default {
    props: ['mangas'],
    setup(props) {
        const search = ref('')
        const mangaTitleAndId = ref([])
        console.log(props.mangas, 'test');
        watchEffect(() => {
            mangaTitleAndId.value = props.mangas.map((m) => ({title: m.title, id: m.id}))
        })        

        const searchManga = computed(() => {
            return mangaTitleAndId.value.filter((m) => m.title.toLowerCase().includes(search.value))
        })


        watch(search, () => {
            console.log(searchManga);
        })


        return { search, searchManga }
    }
}
</script>

<style>

</style>