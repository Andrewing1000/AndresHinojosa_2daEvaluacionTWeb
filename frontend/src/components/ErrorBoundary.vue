<template>
    <div>
      <!-- Render default slot if no error; otherwise render fallback slot -->
      <slot v-if="!error" />
      <slot name="fallback" v-else :error="error" />
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
    name: 'ErrorBoundary',
    setup(_, { slots }) {
      const error = ref(null)
      return { error, slots }
    },
    errorCaptured(err, instance, info) {
      // Capture the error and prevent further propagation
      this.error = err
      console.error('ErrorBoundary caught:', err, info)
      return false
    }
  })
  </script>
  
  <style scoped>
  /* Optional styling for the boundary or fallback slot wrapper */
  </style>
  