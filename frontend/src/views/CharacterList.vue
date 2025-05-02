<template>
  <!-- Status indicator overlay -->
  <StatusIndicator :loading="isLoading" :error="errorMessage" />

  <!-- Perspective wrapper: defines 3D context -->
  <div class="perspective-wrapper">
    <!-- Scroll wrapper: handles vertical scrolling separately -->
    <div class="scroll-wrapper" ref="scrollWrapper">
      <!-- Transform wrapper: only responsible for 3D rotation -->
      <div class="transform-wrapper">
        <!-- Error boundary per card -->
        <ErrorBoundary
          v-for="(char, index) in characters"
          :key="char.name + index"
        >
          <template #default>
            <CharacterCard :properties="char" />
          </template>
          <template #fallback="{ error }">
            <StatusIndicator :error="error.message" />
          </template>
        </ErrorBoundary>

        <!-- Sentinel for infinite scroll -->
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

// Reactive state
const characters = ref([])
const nextUrl = ref('https://www.swapi.tech/api/people')
const isLoading = ref(false)
const errorMessage = ref('')

// Refs for DOM elements
const scrollWrapper = ref(null)
const sentinel = ref(null)
let observer = null

// Fetch next batch of characters
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
      data.results.map((person) =>
        fetch(person.url)
          .then((r) => {
            if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`)
            return r.json()
          })
          .then((d) => d.result.properties)
      )
    )
    characters.value.push(...batch)
  } catch (err) {
    console.error('Failed loading characters:', err)
    errorMessage.value = err.message || 'Failed to load characters.'
  } finally {
    isLoading.value = false
  }
}

// Infinite scroll setup
onMounted(() => {
  loadMore() // initial load
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) loadMore()
    },
    { root: scrollWrapper.value, rootMargin: '0px', threshold: 1.0 }
  )
  if (sentinel.value) observer.observe(sentinel.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* 1) Contenedor de perspectiva sin scroll */
.perspective-wrapper {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* 2) Contenedor de scroll puro */
.scroll-wrapper {
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

/* 3) Contenedor rotado en 3D */
.transform-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background: transparent;
}

/* Sentinel para infinite scroll */
.sentinel {
  width: 100%;
  height: 1px;
}
</style>
