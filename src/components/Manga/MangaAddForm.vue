<template>
    <div class="manga-form">
        <h2 @click="toggleAdding">Add manga to collection</h2>
        <form @submit.prevent="handleSubmit" class="manga-form-content" v-if="isAdding">
            <label for="title">Manga title
                <input 
                name="title"
                id="title"
                type="text"
                placeholder="title..."
                v-model="newManga.title"
                >
            </label>
            <label for="author">Manga author
                <input 
                name="author"
                id="author"
                type="text"
                placeholder="author..."
                v-model="newManga.author"
                >
            </label>
            
            <label for="episodes">Manga episodes
                <input 
                name="episodes"
                id="episodes"
                type="text"
                placeholder="ep..."
                v-model="newManga.own"
                >
            </label>
            
            <label for="end">Is it end?
                <input 
                name="end"
                id="end"
                type="checkbox"
                v-model="newManga.isEnd"
                >
            </label>
           
            <label for="abandoned">Won't keep buying
                <input 
                name="abandoned"
                id="abandoned"
                type="checkbox"
                v-model="newManga.isAbandoned"
                >
            </label>
            <label for="note">Any note:
                <textarea
                name="note"
                cols="70"
                rows="5"
                placeholder="ehh..."
                v-model="newManga.note"
                ></textarea>
            </label>
            

            <button>Add manga</button>
        </form>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';
import { useMangaStore } from '@/stores/MangaStore';

export default {
    setup() {
        const mangaStore = useMangaStore()
        const newManga = ref({
            title: '',
            author: '',
            own: '', 
            isEnd: null, 
            isAbandoned: null, 
            note: ''
        })
        const isAdding = ref(false)
        const toggleAdding = () => {
            console.log(isAdding.value);
            isAdding.value = !isAdding.value
        }
        const handleSubmit = () => {
            if (newManga.value.title) {
                mangaStore.addManga({
                    id: uuidv4(),
                    title: newManga.value.title,
                    author: newManga.value.author, 
                    own: newManga.value.own, 
                    isEnd: newManga.value.isEnd, 
                    isAbandoned: newManga.value.isAbandoned,
                    note: newManga.value.note
                })
            }
            newManga.value = ({
            title: '',
            author: '',
            own: '', 
            isEnd: null, 
            isAbandoned: null, 
            note: ''
        })
        }
        
        return { newManga, handleSubmit, isAdding, toggleAdding }
    }
}
</script>

<style>

</style>