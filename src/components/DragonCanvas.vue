<template>
  <div class="center-container">
    <div class="header">
      <img src="../../res/img/logo.png" width="180px" alt="Dragon Village Collection" />
      <br /><b>Personality Sneak-Peek (Expanded)</b>
    </div>
    <br />
    <div class="grid-container">
      <div class="grid-item">
        <canvas id="dragonCanvas" class="spineCanvas dragonCanvas"></canvas>
        <canvas id="Auraback" class="spineCanvas auraBackCanvas"></canvas>
        <canvas id="Aurafront" class="spineCanvas auraFrontCanvas"></canvas>
        <canvas id="Background" class="spineCanvas backgroundCanvas"></canvas>
        <canvas id="Floor" class="spineCanvas floorCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SpineObject } from '@/utils/spineObject'
import { SpineCanvas } from '@esotericsoftware/spine-webgl'
import { onMounted, ref } from 'vue'
import { useCanvasStore } from '@/stores/canvas'
import _ from 'lodash';

const canvasStore = useCanvasStore()

const canvases = ref<{
  backAura: null | SpineCanvas
  frontAura: null | SpineCanvas
  dragon: null | SpineCanvas
  background: null | SpineCanvas
  floor: null | SpineCanvas
}>({
  backAura: null,
  frontAura: null,
  dragon: null,
  background: null,
  floor: null,
})
onMounted(() => {
  setInitialDragonCanvas()
})

// add debounce when change canvas
canvasStore.$subscribe(_.debounce((mutation, state) => {
  const event = mutation.events as any
  console.log(event)
  switch (event.key) {
    case 'backAura':
    case 'frontAura':
      setBackAuraCanvas()
      setFrontAuraCanvas()
      break
    case 'background':
      setCaveBgCanvas()
      break
    case 'dragon':
      setDragonCanvas()
      break
    case 'floor':
      setFloorCanvas()
      break
    default:
      break
  }
},1000))

function setInitialDragonCanvas() {
  const dragonCanvasElem = document.getElementById('dragonCanvas') as HTMLCanvasElement
  const url =
    './res/spine/character/dragon/dummydragon_01_n_adult_n/dummydragon_01_n_adult_n'
  canvases.value.dragon = new SpineCanvas(dragonCanvasElem, {
    app: new SpineObject(url, 'idle'),
  })
}

function setCaveBgCanvas() {
  canvases.value.background?.dispose()
  const canvasElem = document.getElementById('Background') as HTMLCanvasElement
  canvases.value.background = new SpineCanvas(canvasElem, {
    app: new SpineObject(canvasStore.background.url, canvasStore.background.name),
  })
}
function setBackAuraCanvas() {
  canvases.value.backAura?.dispose()
  const canvasElem = document.getElementById('Auraback') as HTMLCanvasElement
  canvases.value.backAura = new SpineCanvas(canvasElem, {
    app: new SpineObject(canvasStore.backAura.url, canvasStore.backAura.name),
  })
}
function setFrontAuraCanvas() {
  canvases.value.frontAura?.dispose()
  const canvasElem = document.getElementById('Aurafront') as HTMLCanvasElement
  canvases.value.frontAura = new SpineCanvas(canvasElem, {
    app: new SpineObject(canvasStore.frontAura.url, canvasStore.frontAura.name),
  })
}
function setFloorCanvas() {
  canvases.value.floor?.dispose()
  const canvasElem = document.getElementById('Floor') as HTMLCanvasElement
  canvases.value.floor = new SpineCanvas(canvasElem, {
    app: new SpineObject(canvasStore.floor.url, canvasStore.floor.name),
  })
}

function setDragonCanvas() {
  canvases.value.floor?.dispose()
  const canvasElem = document.getElementById('dragonCanvas') as HTMLCanvasElement
  canvases.value.dragon = new SpineCanvas(canvasElem, {
    app: new SpineObject(canvasStore.dragon.url, canvasStore.dragon.name),
  })
}
</script>

<style scoped></style>
