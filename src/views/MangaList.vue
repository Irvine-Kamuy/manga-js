<template>
  <div class="manga">
    <h3 ref="m-title">{{ manga.title }}</h3>
    <div class="manga-details">
      <p id="manga-author">{{ manga.author }}</p>
      <div class="manga-ep">
          <span>Episodes: &ensp;</span><p>{{ manga.own }}&ensp; </p>
      </div>
      <p id="manga-update">{{ update }}</p>
      <p id="manga-note"><span>Note: </span>{{ manga.note ? manga.note : 'none' }}</p>
    </div>
    <div class="icons">
      <div 
        class="edit material-icons"
        @click="handleEdit"
      >edit</div>
      <div 
        class="delete material-icons"
        @click="deleteManga"
      >delete</div>
    </div>
    <div class="edit-form" v-if="isEditting">
      <MangaEditForm :manga="manga" @close-form="handleCloseForm" />
    </div>
  </div>
</template>

<script>

import { ref } from 'vue';
import { useMangaStore } from '../stores/MangaStore';
import MangaEditForm from '../components/Manga/MangaEditForm.vue';

export default {
    props: ['manga'], 
    components: { MangaEditForm },
    setup(props) {
        const mangaStore = useMangaStore()
        const isEditting = ref(false)
        
        const handleEdit= function() {
            isEditting.value = true
        }
        const handleCloseForm = () => {
          isEditting.value = false
        }
        const deleteManga = () => {
          mangaStore.deleteManga(props.manga.id)
          mangaStore.getMangas()
        }
        const update = ref('')
        if(props.manga.isEnd && props.manga.isAbandoned) {
          update.value = 'Finished, and won\'t collect anymore'
        } else if (props.manga.isEnd && !props.manga.isAbandoned) {
          update.value = 'Finished, and will keep collecting'
        } else if (!props.manga.isEnd && props.manga.isAbandoned) {
          update.value = 'To be continued, but won\'t collect anymore'
        } else if (!props.manga.isEnd && !props.manga.isAbandoned) {
          update.value = 'To be continued, will keep collecting'
        }

        return { mangaStore, isEditting, handleEdit, handleCloseForm, update, deleteManga }
    }
}
</script>

<style>

</style>