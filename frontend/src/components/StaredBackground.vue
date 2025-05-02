<template>
  <div ref="canvasContainer" class="canvas-container">
    <canvas ref="canvas" />
    <p>{{ size.width }} x {{ size.height }}</p>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue'
const canvas = ref(null)
const canvasContainer = ref(null)
const canvasContext = ref(null)
const size = reactive({
  height: null,
  width: null
})
let stars = []
let animation_id = null
let resizeObserver = new ResizeObserver((entries) => {
  if (!canvas.value) return
  // console.log("Que psas")
  const canvasRect = canvas.value.getBoundingClientRect()
  size.height = canvasRect.height
  size.width = canvasRect.width
})
const mouse = {x:null, y:null}
const moveListener = (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
}

watch(
  size,
  () => {
    // console.log("Que pasa perrito")
    if (!size.height || !size.width) return

    canvas.value.width = size.width
    canvas.value.height = size.height

    stars.splice(0, stars.length)
    for (let i = 0; i < 300; i++) {
      stars.push({
        y: size.height * Math.random(),
        x: size.width * Math.random(),
        radius: 6 * Math.random() ** 5 + 2,
        energy: 100*Math.random(),
        t: 0,
        period: parseInt(70*Math.random()+80)
      })
    }
  },

  { deep: true }
)

onMounted(() => {
  // console.log(canvas.value);
  resizeObserver.observe(canvas.value)
  canvasContext.value = canvas.value.getContext('2d')
  const context = canvasContext.value

  function draw() {
    if (!canvasContext.value) return
    const context = canvasContext.value
    context.fillStyle = 'black'
    context.rect(0, 0, size.width, size.height)
    context.fill()

    for (const star of stars) {
      context.beginPath()
      context.shadowBlur = (15 * star.radius) / 10 + 4
      context.fillStyle = `rgba(255, 255, 255, ${(star.radius / 50) + (star.energy/100)})`
      context.shadowColor = `rgba(255, 255, 255, ${40 / star.radius})`
      context.arc(star.x, star.y, star.radius, 0, 2 * Math.PI)
      context.fill()

    star.energy = Math.max(0.97 * star.energy, 0) 
    star.t = (star.t+1)%star.period
    if(star.t == 0){
        star.energy = star.energy + 12*Math.random()
        star.period = parseInt(70*Math.random()+80)
    }

    if(mouse.x && mouse.y){
        const dx = star.x - mouse.x
        const dy = star.y - mouse.y
        if((dx*dx + dy*dy) <= 2000){
            star.energy += (100-star.energy)*0.35
        }
    }

    }
    animation_id = requestAnimationFrame(draw)
  }
  animation_id = requestAnimationFrame(draw)
  window.addEventListener('mousemove', moveListener)
})

onBeforeUnmount(() => {
  resizeObserver.disconnect()
  cancelAnimationFrame(animation_id)
  window.removeEventListener('mousemove', moveListener)
})
</script>

<style>
.canvas-container {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: -1;
}

.canvas-container > canvas {
  display: block;
  height: 100%;
  width: 100%;
}
</style>
