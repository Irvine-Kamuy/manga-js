<template>
    <div class="post-edit-form">
        <h2>Editing {{ post.commentTitle }}</h2>
        <form @submit.prevent="handleUpdate" class="blog-form-content">
            <label for="mangaTitle">Manga title
                <input 
                name="mangaTitle"
                id="mangaTitle"
                type="text"
                placeholder="Manga title..."
                v-model="currentPost.mangaTitle"
                >
            </label>
            <label for="commentTitle">Comment title
                <input 
                name="commentTitle"
                id="commentTitle"
                type="text"
                placeholder="comment..."
                v-model="currentPost.commentTitle"
                >
            </label>

            <label for="content">Content
                <textarea 
                name="content"
                cols="40"
                rows="5"
                placeholder="ehh..."
                v-model="currentPost.content"
                ></textarea>
            </label>

            <button>Update</button>
        </form>
    </div>
</template>

<script>
import { ref, defineEmits } from 'vue';
import { useMangaStore } from '@/stores/MangaStore';


export default {
    props: [ 'post' ],
    setup(props, { emit }) {
        const mangaStore = useMangaStore()
        const currentPost = ref({
            mangaTitle: props.post.mangaTitle,
            commentTitle: props.post.commentTitle,
            content: props.post.content, 
            tags: props.post.tags, 
        })
        

        const handleUpdate = () => {
            if (currentPost.value) {
                mangaStore.editPost(props.post.id, {
                    mangaTitle: currentPost.value.mangaTitle, 
                    commentTitle: currentPost.value.commentTitle, 
                    content: currentPost.value.content, 
                    tags: currentPost.value.tags, 
                })
            }
            currentPost.value = {
                mangaTitle: props.post.mangaTitle, 
                commentTitle: props.post.commentTitle, 
                content: props.post.content, 
                tags: props.post.tags, 
            }
            emit('close-form')
        }

        return { handleUpdate, currentPost }
    }
}
</script>