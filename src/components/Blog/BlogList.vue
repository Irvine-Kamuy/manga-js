<template>
    <div class="post">
        <h3 ref="p-title">{{ post.mangaTitle }} - {{ post.commentTitle }}</h3>

        <div class="post-details">
            <p id="post-content">{{ snippet }}</p>
            <span @click="toggleAddingTag">tags</span>
            <AddTag :post="post" v-if="isAddingTag" />
            <div class="tags">
                <div class="tags-details" v-for="t in post.tags" :key="t">
                    <span class="material-icons" >close</span>
                    <p>{{ t }}</p>
                </div>
            </div>
        </div>
        <div class="icons">
            <div 
            class="edit material-icons"
            @click="handleEdit"
            >edit</div>
            <div 
            class="delete material-icons"
            @click="deletePost"
            >delete</div>
        </div>
        <div class="edit-form" v-if="isEditting">
            <BlogEditForm :post="post" @close-form="handleCloseForm" />
        </div>
    </div>
  </template>
  
  <script>
  
  import { computed, ref } from 'vue';
  import { useMangaStore } from '../../stores/MangaStore.js';
  import BlogEditForm from './BlogEditForm.vue';
  import AddTag from '../AddTag.vue'

  
  export default {
      props: ['post'], 
      components: { BlogEditForm, AddTag },
      setup(props) {
          const mangaStore = useMangaStore()
          const isEditting = ref(false)
          const isAddingTag = ref(false)
          const handleEdit= function() {
              isEditting.value = true
          }
          const handleCloseForm = () => {
            isEditting.value = false
          }
          const toggleAddingTag = () => {
            isAddingTag.value = !isAddingTag.value
          }
          const snippet = computed(() => {
            return props.post.content.substring(0, 100) + '......'
          })
          const deletePost = () => {
            mangaStore.deletePost(props.post.id)
            mangaStore.getPosts()
          }

          return { mangaStore, isEditting, isAddingTag, handleEdit, handleCloseForm, toggleAddingTag, snippet, deletePost }
      }
  }
  </script>
  
  <style>
  
  </style>