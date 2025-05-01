<template>
  
  <!-- wrap the view in a flex child -->
  <div class="app-content">
      <Navbar>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/characters">Characters</router-link></li>
        <li><router-link to="/starships">Starships</router-link></li>
        <li><router-link to="/planets">Planets</router-link></li>
      </Navbar>
    <router-view/>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar/Navbar.vue";
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100svh;
  width: 100svw; 
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
}

.app-content {
  flex: 1;
  overflow: hidden;
  
  background-image: url('/images/d7a61190a836bdcfc62bf97af4f4c74b.png');
  background-size: cover;
  background-repeat: no-repeat;
  perspective: 350px;
  perspective-origin: 50% 100%;
}


</style>
