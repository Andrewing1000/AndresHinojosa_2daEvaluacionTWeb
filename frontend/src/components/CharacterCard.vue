<template>
    <div class="card">
      <header class="card__header">
        <h2 class="card__title">{{ properties.name }}</h2>
      </header>
  
      <section class="card__body">
        <div
          v-for="(value, key) in filteredProps"
          :key="key"
          class="card__row"
        >
          <span class="card__label">{{ formatLabel(key) }}</span>
          <span class="card__value">{{ formatValue(value) }}</span>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    properties: {
      type: Object,
      required: true
    }
  })
  
  // Exclude metadata fields
  const filteredProps = computed(() => {
    const { created, edited, url, ...rest } = props.properties
    return rest
  })
  
  function formatLabel(key) {
    return key.replace(/_/g, ' ').toUpperCase()
  }
  
  function formatValue(val) {
    if (Array.isArray(val)) {
      return val.length ? val.join(', ') : 'None'
    }
    return val || 'N/A'
  }
  </script>
  
  <style scoped>
  :root {
    --sw-yellow: #FFE81F;
    --sw-dark: #000;
    --sw-gray: #222;
  }
  
  .card {
    background: rgba(255, 255, 255, 0.12);
    border: 2px solid var(--sw-yellow);
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 500px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
    font-family: 'News Cycle', sans-serif;
    color: var(--sw-yellow);
    backdrop-filter: blur(10px) brightness(50%);
    transform-style: flat;
/* 
    scroll-snap-align: start;
    scroll-snap-stop: always; */

    transform: translateZ(0);
    will-change: transform;
  }
  
  .card * {
    color: var(--sw-yellow);
}

.card__header {
    background: var(--sw-gray);
    padding: 1rem;
    text-align: center;
}

.card__title {
    margin: 0;
    font-size: 1.6rem;
    letter-spacing: 2px;
    color: var(--sw-yellow);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.card__body {
    max-height: 300px;
    overflow-y: auto;
    padding: 0.5rem 0;
    /* Visible scrollbars */
    scrollbar-width: thin;
    scrollbar-color: var(--sw-yellow) rgba(0, 0, 0, 0.2);
}
.card__body::-webkit-scrollbar {
    width: 8px;
}
.card__body::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
}
.card__body::-webkit-scrollbar-thumb {
    background: var(--sw-yellow);
    border-radius: 4px;
}

.card__row {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #333;
    transition: background 0.3s ease;
}
.card__row:nth-child(even) {
    background: rgba(255, 232, 31, 0.05);
}
.card__row:hover {
    background: rgba(255, 232, 31, 0.15);
}

.card__label,
.card__value {
    color: var(--sw-yellow);
  }
  
  .card__label {
    font-weight: bold;
    font-size: 0.85rem;
    text-transform: uppercase;
  }
  
  .card__value {
    text-align: right;
    max-width: 55%;
    word-break: break-word;
    font-size: 0.9rem;
  }
  </style>
  