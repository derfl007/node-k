<script lang="ts" setup>
import roadNodes from '~/assets/roadNodes.json'
import townNodes from '~/assets/townNodes.json'

const canvasRef = useTemplateRef<HTMLCanvasElement | null>('canvasRef')

const threshold = 100
const mouse = { x: -1000, y: -1000 }

const canvasWidth = 546
const canvasHeight = 223

let animationFrame: number | null = null

const updateMouse = (e: MouseEvent) => {
  if (!canvasRef.value || canScroll) return
  const canvas = canvasRef.value
  const rect = canvas.getBoundingClientRect()

  mouse.x = ((e.clientX - rect.left) / rect.width) * canvasWidth
  mouse.y = ((e.clientY - rect.top) / rect.height) * canvasHeight
}

const onScroll = (e: Event) => {
  const target = e.currentTarget as HTMLDivElement
  const scrollProgress = target.scrollLeft / (target.scrollWidth - target.clientWidth)
  mouse.x = ((scrollProgress / 2) + 0.5) * canvasWidth
  mouse.y = canvasHeight / 2
}

const resetMouse = () => {
  mouse.x = -1000
  mouse.y = -1000
}

const drawNode = (ctx: CanvasRenderingContext2D, type: 'road' | 'town', node: { x: number, y: number }) => {
  const dx = mouse.x - (node.x)
  const dy = mouse.y - (node.y)
  let scale = 1

  const distance = Math.sqrt(dx * dx + dy * dy)

  if (distance < threshold) {
    scale = 1 + (1 - distance / threshold) * 3
  }

  const size = (type == 'road' ? 2 : 4) * scale

  ctx.beginPath()
  ctx.ellipse(node.x, node.y, size, size, 0, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.closePath()
}

let animationTimer = 0
let direction = 1
let lastTime = 0
const speed = 0.2

const draw = (currentTime: number = 0) => {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')

  if (!canvas || !ctx) return

  const canvasParent = canvas.parentElement!
  const delta = (currentTime - lastTime) / 1000
  lastTime = currentTime

  if (canScroll) {
    animationTimer += delta * speed * direction

    if (animationTimer >= 1) {
      animationTimer = 1
      direction = -1
    } else if (animationTimer <= 0) {
      animationTimer = 0
      direction = 1
    }

    // cos for slow-fast-slow easing
    const progress = -(Math.cos(Math.PI * animationTimer) - 1) / 2

    const maxScroll = canvasParent.scrollWidth - canvasParent.clientWidth
    canvasParent.scrollLeft = progress * maxScroll
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.reset()

  ctx.scale(canvas.width / canvasWidth, canvas.height / canvasHeight)
  ctx.strokeStyle = '#08bcb9'
  roadNodes.forEach(n => drawNode(ctx, 'road', n))

  ctx.strokeStyle = '#eeaa45'
  townNodes.forEach(n => drawNode(ctx, 'town', n))

  animationFrame = requestAnimationFrame(draw)
}

let canScroll = false

const resizeCanvas: ResizeObserverCallback = (entries) => {
  for (const entry of entries) {
    const canvas = canvasRef.value
    if (!canvas) return

    // add 200 to prevent super slow animation
    canScroll = canvas.clientWidth > (entry.target.clientWidth) + 200
  }
}

let observer: ResizeObserver

watch(canvasRef, () => {
  const canvas = canvasRef.value
  if (!canvas || !canvas.parentElement) return
  // scale up to make it not blurry
  canvas.width = canvasWidth * 3
  canvas.height = canvasHeight * 3
  observer = new ResizeObserver(resizeCanvas)
  observer.observe(canvas.parentElement!)
  resetMouse()
  draw()
})

onUnmounted(() => {
  observer.disconnect()
  if (animationFrame)
    cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <div
    class="h-96 flex items-center justify-center overflow-hidden relative overflow-x-scroll no-scrollbar"
    @scroll="onScroll"
  >
    <ClientOnly>
      <canvas
        ref="canvasRef"
        class="absolute h-full"
        aria-label="An image of nodes representing the road network in carinthia"
        :width="canvasWidth"
        :height="canvasHeight"
        :style="{ aspectRatio: `${canvasWidth}/${canvasHeight}` }"
        @mousemove="updateMouse"
        @mouseleave="resetMouse"
        @touchmove.prevent
        @touchleave.prevent
      />

      <template #fallback>
        <img
          class="absolute h-full max-w-none w-auto"
          :width="canvasWidth"
          :height="canvasHeight"
          :style="{ aspectRatio: `${canvasWidth}/${canvasHeight}` }"
          src="/images/nodes-static.png"
        >
      </template>
    </ClientOnly>
  </div>
</template>
