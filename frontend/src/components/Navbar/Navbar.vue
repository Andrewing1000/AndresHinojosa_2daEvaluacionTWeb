<template>
  <nav aria-label="Main navigation">
    <ul class="navbar">
      <slot />
    </ul>
  </nav>
</template>

<script setup>
// No se necesita lógica reactiva aquí, solo se expone el slot
</script>

<style scoped>

nav {
  position: fixed;
  top: 0;
  width: 100%;
  background: transparent;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 2rem;
  padding-top: 3rem;

  height: 150px;
  overflow: hidden;

  pointer-events: visiblePainted;
}

.navbar {
    display: flex;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
    
    justify-content: space-evenly;
    justify-items: center;
    
    height: 1500px;
    width: 100%;
    
    transition: transform 1s ease 1s, opacity 4s ease 1s;
    opacity: 0;
    transform: translateY(-100%);
    
    list-style: none;
}

.navbar:hover{
    transition: transform 1s ease 0s, opacity 4s ease 0s;
    transform: translateY(0px);
    opacity: 1;
}

.navbar *{
    font-size: 20px;
    font-family: "News Cycle";
    font-weight: 100;
    color: #FFE81F;
}
</style>
