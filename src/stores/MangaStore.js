import { defineStore } from 'pinia';
import { db, mangasRef } from '@/firebase';
import { deleteDoc, getDocs, doc } from 'firebase/firestore';


export const useMangaStore = defineStore('mangaStore', {
    state: () => ({
        mangas: [],
        manga: {
            title: '', 
            author: '', 
            own: '', 
            isEnd: false, 
            isAbandoned: false, 
            note: ''
        },
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
            const res = await fetch('http://localhost:3000/mangas')
            const data = await res.json()

            this.mangas = data
            this.isLoading = false
        }, 
        async addManga(manga) {
            this.mangas.push(manga)

            const res = await fetch('http://localhost:3000/mangas', {
                method: 'POST',
                body: JSON.stringify(manga),
                headers: {'Content-Type': 'application/json'}
            })

            if(res.error) {
                console.log((res.error));
            }
        },
        async deleteManga(id) {
            this.mangas = this.mangas.filter((m) => {
                return m.id !== id
            })

            const res = await fetch('http://localhost:3000/mangas/' + id, {
                method: 'DELETE', 
            })

            if(res.error) {
                console.log((res.error));
            }
        }, 
        async editManga(id, data) {
            const manga = this.mangas.find(m => m.id === id)
            manga.title = data.title
            manga.author = data.author
            manga.own = data.own
            manga.isEnd = data.isEnd
            manga.isAbandoned = data.isAbandoned
            manga.note = data.note
            
            const res = await fetch('http://localhost:3000/mangas/' + id, {
                method: 'PATCH',
                body: JSON.stringify(data), 
                headers: {'Content-Type': 'application/json'}
            })

            if(res.error) {
                console.log((res.error));
            }
        },
        async getManga(id) {
            this.isLoading = true
            const res = await fetch('http://localhost:3000/mangas/' + id)
            const data = await res.json()
            this.manga = data
            this.isLoading = false

            if(res.error) {
                console.log((res.error));
            }
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
            const res = await fetch('http://localhost:3000/blogs/')
            const data = await res.json()
            
            this.posts = data
            console.log(this.posts)
            this.isLoading = false

            if(res.error) {
                console.log((res.error));
            }
        },
        async addPost(post) {
            this.posts.push(post)

            const res = await fetch('http://localhost:3000/blogs', {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {'Content-Type': 'application/json'}
            })

            if(res.error) {
                console.log((res.error));
            }
        },
        async deletePost(id) {
            this.posts = this.posts.filter((p) => {
                return p.id !== id
            })

            const res = await fetch('http://localhost:3000/blog/' + id, {
                method: 'DELETE', 
            })

            if(res.error) {
                console.log((res.error));
            }
        }, 
        async editPost(id, data) {
            const post = this.posts.find( p => p.id === id)
            post.mangaTitle = data.mangaTitle
            post.commentTitle = data.commentTitle
            post.content = data.content
            post.tags = data.tags

            const res = await fetch('http://localhost:3000/blog/' + id, {
                method: 'PATCH',
                body: JSON.stringify(data), 
                headers: {'Content-Type': 'application/json'}
            })

            if(res.error) {
                console.log((res.error));
            }
        }, 
        async getTag(id) {
            this.isLoading = true
            const res = await fetch('http://localhost:3000/blogs/' + id)
            const data = await res.json()
            
            this.tags = data.tags
            console.log(this.tags)
            this.isLoading = false

            if(res.error) {
                console.log((res.error));
            }
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