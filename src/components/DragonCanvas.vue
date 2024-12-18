<template>
  <div class="center-container">
    <div class="header">
      <img
        src="@/module/Personality-Sneak-Peek-Expanded/res/img/logo.png"
        width="180px"
        alt="Dragon Village Collection"
      />
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
import { useCanvasStore } from '@/stores/canvas'

import _ from 'lodash'
import { onMounted, ref, watch } from 'vue'
const canvasStore = useCanvasStore()
const baseResPath = 'https://doto052687.github.io/Personality-Sneak-Peek-Expanded/'
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
watch(() => canvasStore.$state['backAura'], _.debounce(setBackAuraCanvas, 1000))
watch(() => canvasStore.$state['dragon'], _.debounce(setDragonCanvas, 1000))
watch(() => canvasStore.$state['background'], _.debounce(setCaveBgCanvas, 1000))
watch(() => canvasStore.$state['floor'], _.debounce(setFloorCanvas, 1000))
watch(() => canvasStore.$state['frontAura'], _.debounce(setFrontAuraCanvas, 1000))

function setInitialDragonCanvas() {
  const dragonCanvasElem = document.getElementById('dragonCanvas') as HTMLCanvasElement
  const url =
    baseResPath + 'res/spine/character/dragon/dummydragon_01_n_adult_n/dummydragon_01_n_adult_n'
  canvases.value.dragon = new SpineCanvas(dragonCanvasElem, {
    app: new SpineObject(url, 'idle'),
  })
}

function setCaveBgCanvas() {
  canvases.value.background?.dispose()
  const canvasElem = document.getElementById('Background') as HTMLCanvasElement
  canvases.value.background = new SpineCanvas(canvasElem, {
    app: new SpineObject(baseResPath + canvasStore.background.url, canvasStore.background.name),
  })
}

function setBackAuraCanvas() {
  console.log('setBackAuraCanvas')
  canvases.value.backAura?.dispose()
  const canvasElem = document.getElementById('Auraback') as HTMLCanvasElement
  canvases.value.backAura = new SpineCanvas(canvasElem, {
    app: new SpineObject(baseResPath + canvasStore.backAura.url, canvasStore.backAura.name),
  })
}

function setFrontAuraCanvas() {
  canvases.value.frontAura?.dispose()
  const canvasElem = document.getElementById('Aurafront') as HTMLCanvasElement
  canvases.value.frontAura = new SpineCanvas(canvasElem, {
    app: new SpineObject(baseResPath + canvasStore.frontAura.url, canvasStore.frontAura.name),
  })
}

function setFloorCanvas() {
  canvases.value.floor?.dispose()
  const canvasElem = document.getElementById('Floor') as HTMLCanvasElement
  canvases.value.floor = new SpineCanvas(canvasElem, {
    app: new SpineObject(baseResPath + canvasStore.floor.url, canvasStore.floor.name),
  })
}

function setDragonCanvas() {
  canvases.value.floor?.dispose()
  const canvasElem = document.getElementById('dragonCanvas') as HTMLCanvasElement
  canvases.value.dragon = new SpineCanvas(canvasElem, {
    app: new SpineObject(baseResPath + canvasStore.dragon.url, canvasStore.dragon.name),
  })
}
</script>

<style scoped></style>
