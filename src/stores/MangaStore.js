import { defineStore } from 'pinia';
import { db, mangasRef, blogsRef } from '@/firebase';
import { deleteDoc, getDocs, getDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';



export const useMangaStore = defineStore('mangaStore', {
    state: () => ({
        mangas: [],
        manga: {},
        isLoading: false, 
        rec: [{
            img: [],
            url: [],
            title: [],
            titleJp:[],
            authors: [],
            genres: [], 
            bgStory: []
        }], 
        posts: [], 
        tags: [],
        mangasFromApi: []
    }), 
    getters: {
        totalCount: (state) => {
            return state.mangas.length
        },
        updating() {
            return this.mangas.filter((m) => !m.isEnd)
        },
        updatingCount() {
            return this.mangas.reduce((p, c) => {
                return !c.isEnd ? p+1 : p
            }, 0)
        }, 
        end() {
            return this.mangas.filter((m) => m.isEnd)
        },
        endCount() {
            return this.mangas.reduce((p, c) => {
                return c.isEnd ? p+1 : p
            }, 0)
        }, 
        abandoned() {
            return this.mangas.filter((m) => m.isAbandoned)
        },
        abandonedCount() {
            return this.mangas.reduce((p, c) => {
                return c.isAbandoned ? p+1 : p
            }, 0)
        }
    }, 
    actions: {
        async getMangas() {
            this.isLoading = true

            try {
                const snapshot = await getDocs(mangasRef);
                this.mangas = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                console.log(snapshot.docs);
            } catch (error) {
                console.log(error.message);
            }        
            this.isLoading = false
        }, 
        async addManga(manga) {

            await addDoc(mangasRef, {
                id: uuidv4(),
                title: manga.title,
                author: manga.author, 
                own: manga.own, 
                isEnd: manga.isEnd, 
                isAbandoned: manga.isAbandoned,
                note: manga.note
            })
        },
        async deleteManga(id) {
            await deleteDoc(doc(db, 'mangas', id))
        }, 
        async editManga(id, manga) {
            const docRef = doc(db, 'mangas', id)
            await updateDoc(docRef, {
                title: manga.title, 
                author: manga.author, 
                own: manga.own, 
                isEnd: manga.isEnd, 
                isAbandoned: manga.isAbandoned,
                note: manga.note, 
            })
        },
        async getManga(id) {
            this.isLoading = true
            const docRef = doc(db, 'mangas', id)
            const docc = await getDoc(docRef)
            this.manga = docc.data()            
            this.isLoading = false

        },
        async getHomePageImg () {
            try{
                this.isLoading = true
                const res = await fetch('https://api.jikan.moe/v4/random/manga')
                const data = await res.json()
                
                this.rec = {
                    img: data.data.images.webp.large_image_url, 
                    url: data.data.url, 
                    title: data.data.title, 
                    titleJp: data.data.title_japanese, 
                    authors: data.data.authors, 
                    genres: data.data.genres, 
                    bgStory: data.data.background    
                }
                this.isLoading = false 
            } catch(err) {
                console.log(err);
            }
        }, 
        async getPosts() {
            this.isLoading = true
            try {
                const snapshot = await getDocs(blogsRef);
                this.posts = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            } catch (error) {
                console.log(error.message);
            }        
            this.isLoading = false

        },
        async addPost(post) {

            await addDoc(blogsRef, {
                id: uuidv4(),
                mangaTitle: post.mangaTitle,
                commentTitle: post.commentTitle, 
                content: post.content, 
                tags: post.tags
            })
        },
        async deletePost(id) {

            await deleteDoc(doc(db, 'blogs', id))
        }, 
        async editPost(id, post) {

            const docRef = doc(db, 'blogs', id)
            await updateDoc(docRef, {
                mangaTitle: post.mangaTitle, 
                commentTitle: post.commentTitle, 
                content: post.content, 
                tags: post.tags, 
            })
        }, 
        async getTag(id) {
            this.isLoading = true
            this.isLoading = false

        },
        async addTag(id, tag) {

            const post = this.posts.find( p => p.id === id)
            post.mangaTitle = tag.mangaTitle
            post.commentTitle = tag.commentTitle
            post.content = tag.content
            post.tags = tag.tags

            const res = await fetch('http://localhost:3000/blogs/' + id, {
                method: 'PATCH',
                body: JSON.stringify(tag), 
                headers: {'Content-Type': 'application/json'}
            })


            if(res.error) {
                console.log((res.error));
            }
        },
    }
})