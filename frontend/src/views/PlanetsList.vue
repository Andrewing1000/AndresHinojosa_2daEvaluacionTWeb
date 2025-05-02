<template>
  <!-- Overall status indicator for loading and fetch errors -->
  <StatusIndicator :loading="isLoading" :error="errorMessage" />
  <div class="page-container">
    <div class="transform-container" ref="scrollContainer">
      <div class="planet-list">
        <!-- Render each planet within an error boundary -->
        <ErrorBoundary
          v-for="(planet, index) in planets"
          :key="planet.name + index"
        >
          <template #default>
            <CharacterCard :properties="planet" />
          </template>
          <template #fallback="{ error }">
            <StatusIndicator :error="error.message" />
          </template>
        </ErrorBoundary>

        <!-- Sentinel element to trigger loading more -->
        <div ref="sentinel" class="sentinel"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CharacterCard from '../components/CharacterCard.vue'
import StatusIndicator from '../components/StatusIndicator.vue'
import ErrorBoundary from '../components/ErrorBoundary.vue'

// Reactive state for planets
const planets = ref([])
const nextUrl = ref('https://www.swapi.tech/api/planets')
const isLoading = ref(false)
const errorMessage = ref('')
const sentinel = ref(null)
const scrollContainer = ref(null)
let observer = null

// Fetch next batch of planets
async function loadMore() {
  if (!nextUrl.value || isLoading.value) return
  isLoading.value = true
  errorMessage.value = ''
  try {
    const res = await fetch(nextUrl.value)
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    const data = await res.json()
    nextUrl.value = data.next
      ? data.next.startsWith('http')
        ? data.next
        : `https://www.swapi.tech${data.next}`
      : null
    const batch = await Promise.all(
      data.results.map((item) =>
        fetch(item.url)
          .then((r) => {
            if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
            return r.json()
          })
          .then((d) => d.result.properties)
      )
    )
    planets.value.push(...batch)
  } catch (err) {
    console.error('Failed loading planets:', err)
    errorMessage.value = err.message || 'Failed to load planets.'
  } finally {
    isLoading.value = false
  }
}

// Infinite scroll setup for planets
onMounted(() => {
  loadMore()
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) loadMore()
    },
    { root: scrollContainer.value, rootMargin: '0px', threshold: 1.0 }
  )
  if (sentinel.value) observer.observe(sentinel.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.page-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  
}

.transform-container {
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 80%,
    transparent 100%
  );
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  padding-top: 40svh;

  backface-visibility: hidden;
  will-change: transform;
  transform-style: preserve-3d;
  transform-origin: center bottom;
  transform: perspective(340px) rotateX(20deg) translateZ(200px);

  contain: paint;
}

.planet-list{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background: transparent;
}

/* Fade overlays at top and bottom */
.planet-list::before,
.planet-list::after {
  content: '';
  position: sticky;
  left: 0;
  right: 0;
  height: 100px;
  pointer-events: none;
  z-index: 2;
}
.planet-list::before {
  top: 0;
  background: linear-gradient(to bottom, #111, transparent);
}
.planet-list::after {
  bottom: 0;
  background: linear-gradient(to top, #111, transparent);
}

.sentinel {
  width: 100%;
  height: 1px;
}
</style>
