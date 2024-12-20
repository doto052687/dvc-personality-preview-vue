<template>
  <div class="left-container">
    <el-form ref="form" :model="formData">
      <!-- language -->
      <el-form-item label="Language">
        <el-select v-model="locale">
          <el-option value="en-US" label="English"> </el-option>
          <el-option value="zh-TW" label="正體中文"> </el-option>
          <el-option value="ko-KR" label="한국어"> </el-option>
        </el-select>
      </el-form-item>
      <!-- personality -->
      <el-form-item>
        <div class="select-container">
          <el-button type="primary" @click="handlePersonalityLtClick">&lt;</el-button>
          <el-select
            filterable
            v-model="formData.personality"
            class="select-width"
            @change="setPersonalityUrl"
          >
            <el-option
              v-for="(item, index) in personalityList"
              :key="index"
              :value="index"
              :label="$t(`personality.${item.name}`)"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="handlePersonalityGtClick">&gt;</el-button>
        </div>
      </el-form-item>
      <!-- special personality:My heart detail setting(color and type) -->
      <div v-if="personalityName == 'My Heart'">
        <el-form-item label="Front">
          <el-select v-model="formData.myHeartFrontType" @change="setPersonalityUrl">
            <el-option
              v-for="(item, index) in MyHeartList.front"
              :key="item.name"
              :label="item.name"
              :value="index"
            ></el-option>
          </el-select>
          <el-select v-model="formData.myHeartFrontColor" @change="setPersonalityUrl">
            <el-option
              v-for="item in MyHeartList.front[formData.myHeartFrontType].color"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Back">
          <el-select v-model="formData.myHeartBackType" @change="setPersonalityUrl">
            <el-option
              v-for="(item, index) in MyHeartList.back"
              :key="item.name"
              :label="item.name"
              :value="index"
            ></el-option>
          </el-select>
          <el-select v-model="formData.myHeartBackColor" @change="setPersonalityUrl">
            <el-option
              v-for="item in MyHeartList.back[formData.myHeartBackType].color"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <!-- special personality:My Own detail setting(color and type) -->
      <div v-if="personalityName == 'My Own'">
        <el-form-item label="Front" class="select-container">
          <el-select v-model="formData.myOwnFrontType">
            <el-option
              v-for="(item, index) in MyOwnList.front"
              :key="item.name"
              :label="item.name"
              :value="index"
            ></el-option>
          </el-select>
          <el-select v-model="formData.myOwnFrontColor">
            <el-option
              v-for="item in MyOwnList.front[formData.myOwnFrontType].color"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Back" class="select-container">
          <el-select v-model="formData.myOwnBackType">
            <el-option
              v-for="(item, index) in MyOwnList.back"
              :key="item.name"
              :label="item.name"
              :value="index"
            ></el-option>
          </el-select>
          <el-select v-model="formData.myOwnBackColor">
            <el-option
              v-for="item in MyOwnList.back[formData.myOwnBackType].color"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <!-- cave background -->
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
      <!-- background animation state -->
      <el-form-item>
        <el-radio-group v-model="formData.bgState" @change="setCavebgUrl">
          <el-radio value="idle">idle</el-radio>
          <el-radio value="">stop</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- background brightness -->
      <el-form-item>
        <el-radio-group v-model="formData.bgBrightness" @change="setBgBrightness">
          <el-radio :value="1">bright</el-radio>
          <el-radio :value="0.5">dark</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- cave floor -->
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
      <!-- floor animation state -->
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
import { computed, ref } from 'vue'
import { useCanvasStore } from '@/stores/canvas'
import { useLoadSpecialPersonality } from '@/utils/loadSpecialPersionality'
import i18n from '@/locales'
const { personalityList, CaveBgList, CaveFloorList } = useLoadDict()
const formData = ref<LeftForm>(new LeftForm())
const canvasStore = useCanvasStore()
const { MyHeartList, MyOwnList } = useLoadSpecialPersonality()
const personalityName = computed(() => {
  if (personalityList.value.length === 0) return ''
  return personalityList.value[formData.value.personality].name
})
const { locale } = i18n.global

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

/**
 * set aura resource url
 */
function setPersonalityUrl() {
  // MyHeart and MyOwn use both type and color to get correct resource
  const personality = personalityList.value[formData.value.personality]
  switch (personality.name) {
    case 'My Heart':
      canvasStore.backAura = {
        url: 'res/spine/aura_each/aura_blissfull/aura_blissfull',
        name: formData.value.myHeartBackColor,
      }
      canvasStore.frontAura = {
        url: 'res/spine/aura_each/aura_blissfull/aura_blissfull',
        name: formData.value.myHeartFrontColor,
      }
      break
    case 'My Own':
      canvasStore.backAura = {
        url: 'res/spine/aura_each/aura_myheart/aura_myheart',
        name: formData.value.myOwnBackColor,
      }
      canvasStore.frontAura = {
        url: 'res/spine/aura_each/aura_myheart/aura_myheart',
        name: formData.value.myOwnFrontColor,
      }
      break
    default:
      // check wether the personality has each property
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
  canvasStore.brightness = formData.value.bgBrightness
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
