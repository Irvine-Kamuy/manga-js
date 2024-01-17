<template>
  <nav class="navbar">
    <div class="nav-home">
      <router-link to="/">Home</router-link> 
    </div>
    <router-link :to="{name: 'collection'}">Collection</router-link>
    <span>||</span>
    <router-link :to="{name: 'blog'}">Blog</router-link> 
    <span>||</span>
    <router-link :to="{name: 'search'}">Search</router-link> 
  </nav>
  <router-view/>
</template>

<style>
</style>
