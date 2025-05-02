<template>
    <footer>
      <!-- Subtle side indicator for reveal on hover -->
      <div class="indicator-circle"></div>
      
      <div class="footer-content">
          <!-- Column 1: Author and Institution -->
        <div class="footer-col name">
          <p class="footer-item accent">© 2025 Andres Ignacio Hinojosa Garnica</p>
          <p class="footer-item">Universidad Católica Boliviana</p>
          <p class="footer-item">Facultad de Ingeniería</p>
        </div>
  
        <!-- Column 2: Project Description -->
        <div class="footer-col">
          <p class="footer-description">
            Portal web para SWAPI: un buscador interactivo de personajes, naves espaciales y planetas del universo Star Wars,
            construido con Vue.js, Vue Router y la API pública de SWAPI.
          </p>
        </div>
  
        <!-- Column 3: Course and Version -->
        <div class="footer-col techweb">
          <p class="footer-item accent">Tecnologías Web</p>
          <p class="footer-item">Versión 1.0.0</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  // Static footer, no reactive logic needed
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

  :root {
    --sw-yellow: #FFE81F;
    --sw-light: #E0E0E0;
    --sw-dark: #000;
  }
  
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    /* background: rgba(0, 0, 0, 0.85); */
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    pointer-events: visiblePainted;
    font-family: 'Raleway', Arial, sans-serif;
    padding-inline: 2rem;
  }
  
  /* Blinking side indicator */
  .indicator-circle {
    position: absolute;
    left: 40%;
    top: 20px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border: 10px solid #FFE81F;
    border-radius: 50%;
    animation: blink 1s ease-in-out infinite;
    pointer-events: none;
    z-index: 30;
  }

  @keyframes blink {
    0%, 49% { opacity: 0.3; }
    50%, 100% { opacity: 1; }
  }
  
  .footer-content {
    position: relative;
    bottom: -85%; /* hide offscreen */
    opacity: 0;
    transition: bottom 0.8s ease, opacity 0.5s ease;
    width: 100%;
    background: rgba(0, 0, 0, 0.401);
    backdrop-filter: blur(5px) brightness(50%);
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    place-content: center;
    justify-items: center;
    color: var(--sw-light);
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.7);
  }
  
  footer:hover .footer-content {
    bottom: 0;
    opacity: 1;
  }
  
  .footer-col {
    text-align: left;
  }
    .name{
        justify-self: start;
    }

    .techweb{
        justify-self: end;
    }
  
  .footer-item {
    margin: 0.25rem 0;
    font-size: 1rem;
    line-height: 1.4;
    font-weight: 200;
  }

  .footer-description {
      font-size: 1rem;
      line-height: 1.5;
      color: #ccc;
      font-weight: 200;
    }
  
  .accent {
    color: white;
    font-weight: 400;
    font-size: 1rem;
  }
  </style>
