<template>
    <div class="manga-edit-form">
        <h2>Editing {{ manga.title }}</h2>
        <form @submit.prevent="handleUpdate" class="manga-form-content">
            <label for="title">Manga title
                <input 
                    name="title"
                    id="title"
                    type="text"
                    placeholder="title..."
                    v-model="currentManga.title"
                >
            </label>
            <label for="author">Manga author
                <input 
                    name="author"
                    id="author"
                    type="text"
                    placeholder="author..."
                    v-model="currentManga.author"
                >
            </label>

            <label for="episodes">Manga episodes
                <input 
                    name="episodes"
                    id="episodes"
                    type="text"
                    placeholder="ep..."
                    v-model="currentManga.own"
                >
            </label>
            
            <label for="end">Is it end?
                <input 
                    name="end"
                    id="end"
                    type="checkbox"
                    v-model="currentManga.isEnd"
                >
            </label>
           
            <label for="abandoned">Won't keep buying
                <input 
                    name="abandoned"
                    id="abandoned"
                    type="checkbox"
                    v-model="currentManga.isAbandoned"
                >
            </label>
            <label for="note">Any note:
                <textarea
                name="note"
                cols="40"
                rows="5"
                v-model="currentManga.note"
                ></textarea>
            </label>


            <button>Update</button>
        </form>
    </div>
</template>

<script>
import { ref, defineEmits } from 'vue';
import { useMangaStore } from '../../stores/MangaStore';

export default {
    props: [ 'manga' ],
    setup(props, { emit }) {
        const mangaStore = useMangaStore()
        const currentManga = ref({
            title: props.manga.title,
            author: props.manga.author,
            own: props.manga.own, 
            isEnd: props.manga.isEnd, 
            isAbandoned: props.manga.isAbandoned,
            note: props.manga.note,
        })
        

        const handleUpdate = () => {
            if (currentManga.value) {
                mangaStore.editManga(props.manga.id, {
                    title: currentManga.value.title, 
                    author: currentManga.value.author, 
                    own: currentManga.value.own, 
                    isEnd: currentManga.value.isEnd, 
                    isAbandoned: currentManga.value.isAbandoned,
                    note: currentManga.value.note, 
                })
            }
            currentManga.value = {
                    title: props.manga.title,
                    author: props.manga.author,
                    own: props.manga.own, 
                    isEnd: props.manga.isEnd, 
                    isAbandoned: props.manga.isAbandoned,
                    note: props.manga.note,
            }
            emit('close-form')
        }

        return { handleUpdate, currentManga }
    }
}
</script>