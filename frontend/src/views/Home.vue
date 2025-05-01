<template>
    <div class="home-page">
        <div class="hero">
            <!-- Star Wars logo -->
            <img
            src="/images/star-wars-logo.png"
            alt="Star Wars Logo"
            class="hero__logo"
            />
        </div>
        <!-- Image links for sections -->
        <div class="hero__links">
          <router-link to="/characters" class="card-link">
            <img
              src="/images/characters-card.png"
              alt="Characters"
              class="card-link__img"
            />
            <span class="card-link__label">Characters</span>
          </router-link>
  
          <router-link to="/starships" class="card-link">
            <img
              src="/images/starships-card.png"
              alt="Starships"
              class="card-link__img"
            />
            <span class="card-link__label">Starships</span>
          </router-link>
          
          <router-link to="/planets" class="card-link">
            <img
              src="/images/planets-card.png"
              alt="Planets"
              class="card-link__img"
            />
            <span class="card-link__label">Planets</span>
          </router-link>
        </div>
    </div>
  </template>
  
  <script setup>
  // Static home page, no reactive state
  </script>
  
  <style scoped>

  .home-page {
    height: 100vh;
    display: grid;
    justify-content: center;
    align-items: center;
    place-content: center;
    place-items: center;
    grid-template-columns: 80% 20%;
    background: url('/images/starfield.jpg') center/cover no-repeat;
  }
  
  .hero {
    grid-column: 1;
    background: rgba(0, 0, 0, 0.7);
    padding: 2rem;
    /* border: 2px solid var(--sw-yellow); */
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .hero__logo {
    width: 400px;
    max-width: 80%;
    margin-bottom: 2rem;
  }
  
  .hero__links {
    display: flex;
    flex-direction: column;
    grid-column: 2;
    gap: 2rem;
  }
  
  .card-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    
    background-color: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    box-shadow: 0 4px 12px 5px rgba(0, 0, 0, 0.843);
    transition: transform 0.2s ease;
    padding: 20px;
  }
  
  .card-link:hover{
    transform: translateY(-5px);
  }

  .card-link__img {
    width: 180px;
    height: auto;
    border: none;
    border-radius: 4px;
    padding: 10px;

    filter: saturate(0%);
  }
  
  .card-link__label {
    margin-top: 0.75rem;
    font-family: 'News Cycle', sans-serif;
    font-weight: 700;
    font-size: 2rem;
    color: white;
    letter-spacing: 1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  }
  </style>
  