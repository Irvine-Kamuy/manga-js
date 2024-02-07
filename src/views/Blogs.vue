<template>
    <div class="blog">
      <div class="blog-title">
        <h1>Blog</h1>
      </div>
      <div class="scroll">
        <ScrollToBottom />
      </div>
      <!-- loading -->
      <div class="loading" v-if="isLoading">Loading posts...</div>

      <!-- blog list -->
      <div class="post-list" v-if="filter === 'all'">
        <p>{{ posts.length }} posts</p>
        <div v-for="post in posts" :key="post.id">
          <BlogList :post="post" />
        </div>
      </div>
      <!-- new post form -->
      <BlogAddForm />
    </div>
    
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { useMangaStore } from '../stores/MangaStore'
  import { storeToRefs } from 'pinia';

  // components
  import BlogAddForm from '../components/Blog/BlogAddForm.vue';
  import ScrollToBottom from '../components/ScrollToBottom.vue';
  import BlogList from '../components/Blog/BlogList.vue'


  export default defineComponent({
    name: 'Blog',
    components: { BlogAddForm, ScrollToBottom, BlogList },
    setup() {
      const mangaStore = useMangaStore()

      const { posts, isLoading } = storeToRefs(mangaStore)

      //fetch mangas
      const fetchPosts = async() => {
        await mangaStore.getPosts()
      } 
      fetchPosts()
      console.log(posts.value, '123');
      const filter = ref('all')

      return { posts, isLoading, filter }
    }

  });
  </script>