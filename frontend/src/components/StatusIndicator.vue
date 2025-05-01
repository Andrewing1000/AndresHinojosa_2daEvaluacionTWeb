<template>
  <!-- Full-screen overlay when loading to block interactions and blur content -->
  <div v-if="loading" class="overlay">
    <div class="spinner-wrapper">
      <div class="spinner"></div>
      <h2>Loading...</h2>
    </div>
  </div>

  <!-- Error message stays centered but does not block interactions on loading -->
  <div v-else-if="error" class="error-wrapper">
    <p>{{ error }}</p>
  </div>
</template>

<script setup>
// Props for loading and error state
const {loading, error} = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
/* Overlay covers full viewport, blurs background, blocks clicks */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.4);
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: all;
}

.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  border: 4px solid rgba(255, 232, 31, 0.3);
  border-top-color: #FFE81F;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner-wrapper h2 {
  margin: 0;
  font-family: "News Cycle", sans-serif;
  color: #FFE81F;
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.7);
}

.error-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
  border: 1px solid #f44336;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-family: "News Cycle", sans-serif;
  font-weight: bold;
  z-index: 2001;
}
</style>
  