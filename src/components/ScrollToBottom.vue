<template>
    <div class="scroll">
        <button id="scroll-up" class=" material-icons" @click="toTop">keyboard_double_arrow_up</button>
        <button id="scroll-down" class="material-icons" @click="toBottom">keyboard_double_arrow_down</button>
    </div>
</template>

<script>
export default {
    setup() {
        const toTop = () => {
            window.scrollTo({
                top: 0, 
                behavior: 'smooth'
            })
        }
        const toBottom = () => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            })
        }

        return { toTop, toBottom }
    }
}
</script>

<style>

</style>