<template>
  <nav aria-label="Main navigation">
    <ul class="navbar">
      <slot/>
    </ul>
  </nav>
</template>

<script setup>
// sin lógica adicional
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* height: 150px; */
  overflow: hidden;
  background: transparent;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: visiblePainted;
}

nav::after {
  content: '';
  position: absolute;
  top: 20px;               /* moves it 10px from the top of the nav */
  left: 50%;               /* center it horizontally */
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 16px solid transparent;   /* wider base */
  border-right: 16px solid transparent;  /* wider base */
  border-bottom: 16px solid #FFE81F;     /* taller arrow */
  animation: bounce 1.5s infinite;
  pointer-events: none;
}

nav:hover::after {
  opacity: 0;
  transition: opacity 0.3s;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-5px); }
}

.navbar {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  height: 150px;             /* altura real del menú */
  background-color: rgba(0,0,0,0.73);
  top: -100px;               /* oculta la mayor parte */
  opacity: 0;
  transition: top 1s ease 1s, opacity 0.5s ease 1s;
}

.navbar:hover {
  top: 0;
  opacity: 1;
  transition-delay: 0s;
}

/* estilos de los enlaces */
.navbar ::v-deep li a {
  font-size: 30px;
  font-family: "News Cycle";
  font-weight: 100;
  color: #FFE81F;
  text-decoration: none;
  transition: text-shadow 0.3s ease, box-shadow 0.3s ease;
}

.navbar ::v-deep li a:hover {
  text-shadow: 0 0 20px #feef67, 0 0 30px #FFE81F;
}
</style>
