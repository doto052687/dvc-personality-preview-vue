<template>
  <div class="left-container">
    <el-form ref="form" :model="formData">
      <el-form-item>
        <div class="select-container">
          <el-button type="primary" @click="handlePersonalityLtClick">&lt;</el-button>
          <el-select
            v-model="formData.personality"
            class="select-width"
            placeholder=""
            @change="setPersonalityUrl"
          >
            <el-option
              v-for="(item, index) in personalityList"
              :key="index"
              :value="index"
              :label="item.name"
              >
              
              <!-- :label="$t(`personality.${item.name}`)" -->
            </el-option>
          </el-select>
          <el-button type="primary" @click="handlePersonalityGtClick">&gt;</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="select-container">
          <el-button type="primary" @click="handleBackgroundLtClick">&lt;</el-button>
          <el-select
            v-model="formData.caveBg"
            class="select-width"
            placeholder=""
            @change="setCavebgUrl"
          >
            <el-option
              v-for="(item, index) in CaveBgList"
              :key="index"
              :label="item.name"
              :value="index"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="handleBackgroundGtClick">&gt;</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="formData.bgState" @change="setCavebgUrl">
          <el-radio value="idle">idle</el-radio>
          <el-radio value="">stop</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="formData.bgBrightness" @change="setBgBrightness">
          <el-radio :value="1">bright</el-radio>
          <el-radio :value="0.5">dark</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div class="select-container">
          <el-button type="primary" @click="handleFloorLtClick">&lt;</el-button>
          <el-select
            v-model="formData.caveFloor"
            class="select-width"
            placeholder=""
            @change="setCaveFloorUrl"
          >
            <el-option
              v-for="(item, index) in CaveFloorList"
              :key="index"
              :label="item.name"
              :value="index"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="handleFloorRtClick">&gt;</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="formData.floorState" @change="setCaveFloorUrl">
          <el-radio value="idle">idle</el-radio>
          <el-radio value="">stop</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { LeftForm } from '@/models/formModels'
import { useLoadDict } from '@/utils/loadDict'
import { ref } from 'vue'
import { useCanvasStore } from '@/stores/canvas'

const { personalityList, CaveBgList, CaveFloorList } = useLoadDict()
const formData = ref<LeftForm>(new LeftForm())
const canvasStore = useCanvasStore()

function handlePersonalityLtClick() {
  formData.value.personality--
  setPersonalityUrl()
}

function handlePersonalityGtClick() {
  formData.value.personality++
  setPersonalityUrl()
}

function handleBackgroundLtClick() {
  formData.value.caveBg--
  setCavebgUrl()
}

function handleBackgroundGtClick() {
  formData.value.caveBg++
  setCavebgUrl()
}

function handleFloorLtClick() {
  formData.value.caveFloor--
  setCaveFloorUrl()
}

function handleFloorRtClick() {
  formData.value.caveFloor++
  setCaveFloorUrl()
}

function setPersonalityUrl() {
  const personality = personalityList.value[formData.value.personality]
  switch (personality.name) {
    case 'My Heart':
    case 'My Own':
      canvasStore.backAura.url = ''
      canvasStore.backAura.name = ''
      canvasStore.frontAura.url = ''
      canvasStore.frontAura.name = ''
      break
    default:
      if (personality.each !== undefined) {
        canvasStore.backAura = {
          url: `res/spine/aura_each/${personality.each}/${personality.each}`,
          name: personality.back,
        }
        canvasStore.frontAura = {
          url: `res/spine/aura_each/${personality.each}/${personality.each}`,
          name: personality.front,
        }
      } else {
        canvasStore.backAura = {
          url: `res/spine/aura/aura_back/aura_back`,
          name: personality.back,
        }
        canvasStore.frontAura = {
          url: `res/spine/aura/aura_front/aura_front`,
          name: personality.front,
        }
      }
  }
}
function setCavebgUrl() {
  const caveBg = CaveBgList.value[formData.value.caveBg]
  if (caveBg.name === 'none') {
    canvasStore.background = {
      url: 'res/spine/aura/aura_back/aura_back',
      name: '',
    }
  } else {
    canvasStore.background = {
      url: `res/spine/cavedeco/${caveBg.res}`,
      name: formData.value.bgState,
    }
  }
}

function setCaveFloorUrl() {
  const caveFloor = CaveFloorList.value[formData.value.caveFloor]
  if (caveFloor.name === 'none') {
    canvasStore.floor = {
      url: 'res/spine/aura/aura_back/aura_back',
      name: '',
    }
  } else {
    canvasStore.floor = {
      url: `res/spine/cavedeco/${caveFloor.res}`,
      name: formData.value.floorState,
    }
  }
}

function setBgBrightness() {
  var ele = document.getElementById('Background')
  if (!ele) return
  ele.style.filter = `brightness(${formData.value.bgBrightness})`
}
</script>

<style scoped>
.select-container {
  display: inline-flex;
}
.select-width {
  min-width: 150px;
  margin: 0 5px;
}
</style>
