<template>
    <form @submit.prevent="handleAddTag">
        <label for="tag">Add tag</label>
        <input type="text" v-model="tempTag" placeholder="keep it short tho...">
        <!-- <div class="pill" v-for="t in tags" :key="t">
            <span>{{ t }}</span>
        </div> -->
        <div class="submit">
            <button>Add</button>
        </div>

    </form> 
</template>

<script>
import { ref } from 'vue'
import { useMangaStore } from '../stores/MangaStore'

export default { 
    props: ['post'],
    components: { useMangaStore },
    setup(props) {
        const mangaStore = useMangaStore()
        const tempTag = ref('')
        const tags = ref([])
        
        const getTag = async () => {
            try {
                const tag = await         mangaStore.getTag(props.post.id)
                tags.value = Array.isArray(tag) ? tag : []
            } catch (err) {
                console.error('Error occurred while fetching tags: ', err);
            }
        }
        getTag()

        const handleAddTag = (() => {
            
            if(!tags.value.includes(tempTag.value && tags.value !== "")) {
                tags.value.push(tempTag.value)
                mangaStore.addTag(props.post.id, {
                    id: props.post.id, 
                    mangaTitle: props.post.mangaTitle, 
                    commentTitle: props.post.commentTitle, 
                    content: props.post.content, 
                    tags: [...props.post.tags, tempTag.value]
                })
                console.log(props.post.tags);
            }
        })
        console.log(tempTag.value, tags.value, 'tags');
        return { tempTag, tags, handleAddTag }
    }
}
</script>

<style>

</style>