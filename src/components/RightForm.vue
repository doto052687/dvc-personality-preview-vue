<template>
  <div class="right-container">
    <el-form ref="form" :model="formData" style="min-width: 250px">
      <!-- species -->
      <el-form-item prop="species">
        <div style="display: inline-flex; gap: 0.25rem; flex-grow: 1">
          <el-button type="primary" @click="handleDragonLtClick">&lt;</el-button>
          <el-select v-model="formData.species" filterable style="flex-grow: 1">
            <el-option
              v-for="(dragon, index) in dragonList"
              :key="index"
              :value="index"
              :label="$t(`dragon.${dragon.speciesDisplay}`)"
            />
          </el-select>
          <el-button type="primary" @click="handleDragonGtClick">&gt;</el-button>
        </div>
      </el-form-item>
      <el-form-item prop="forms">
        <el-select v-model="formData.forms">
          <el-option
            v-for="(item, index) in formList"
            :key="index"
            :label="item.formDisplay"
            :value="index"
          />
        </el-select>
      </el-form-item>
      <!-- gender -->
      <el-form-item prop="genders">
        <el-radio-group v-model="formData.genders">
          <el-radio v-for="(item, index) in genderList" :key="index" :value="index">
            <img
              v-if="item.name == 'm'"
              src="@pspe/res/img/gender_m_0201.png"
              alt="male selection"
            />
            <img
              v-else-if="item.name == 'f'"
              src="@pspe/res/img/gender_f_0201.png"
              alt="female selection"
            />
            <img
              v-else-if="item.name == 'n'"
              src="@pspe/res/img/gender_n_0201.png"
              alt="neutral selection"
            />
            <div v-else>{{ item.name }}</div>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- stage -->
      <el-form-item prop="stage">
        <el-radio-group v-model="formData.stage" style="margin-top: 10px">
          <el-radio v-for="(item, index) in stageList" :key="index" :value="index">
            <img
              v-if="item.name == 'hatch'"
              src="@pspe/res/img/stage_hatch.png"
              alt="hatch selection"
            />
            <img
              v-else-if="item.name == 'hatchling'"
              src="@pspe/res/img/stage_hatchling.png"
              alt="hatchling selection"
            />
            <img
              v-else-if="item.name == 'adult'"
              src="@pspe/res/img/stage_adult.png"
              alt="adult selection"
            />
            <img
              v-else-if="item.name == 'essence'"
              src="@pspe/res/img/stage_essence.png"
              alt="essence selection"
            />
            <div v-else>{{ item.name }}</div>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- animation -->
      <el-form-item prop="animation">
        <el-radio-group v-model="formData.animation" class="animation-radios">
          <el-radio value="idle">Idle</el-radio>
          <el-radio value="move">moving</el-radio>
          <el-radio value="holding">holding</el-radio>
          <el-radio value="touch">touch</el-radio>
          <el-radio value="">none</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useLoadDragon } from '@/utils/loadDragon'
import { RightForm } from '@/models/formModels'
import { computed, ref, watch } from 'vue'
import type { Form, Gender, Stage } from '@/models/dictModels'
import { useCanvasStore } from '@/stores/canvas'
import _ from 'lodash'

const canvasStore = useCanvasStore()
const lastSpecies = ref<number>(0)
const { dragonList } = useLoadDragon()
const formData = ref<RightForm>(new RightForm())
const formList = computed<Form[]>(() => {
  if (dragonList.value.length > 0)
    return dragonList.value[formData.value.species].stage[formData.value.stage].forms
  return []
})

const genderList = computed<Gender[]>(() => {
  if (dragonList.value.length > 0)
    return dragonList.value[formData.value.species].stage[formData.value.stage].forms[
      formData.value.forms
    ].genders
  return []
})

const stageList = computed<Stage[]>(() => {
  if (dragonList.value.length > 0) return dragonList.value[formData.value.species].stage
  else return []
})

/**
 * when dragon species be changed，change other property to default value
 */
watch(
  formData,
  (newVal) => {
    if (lastSpecies.value !== newVal.species) {
      resetForm()
    }
    setDragonUrl()
    lastSpecies.value = newVal.species
  },
  { deep: true },
)

function resetForm() {
  formData.value.forms = 0
  formData.value.genders = 0
  // set default stage to adult(if no adult found，set value to 0)
  const adultStage = _.findIndex(stageList.value, { name: 'adult' })
  formData.value.stage = adultStage == -1 ? 0 : adultStage
  formData.value.animation = 'idle'
}

function setDragonUrl() {
  let url
  const stageName =
    dragonList.value[formData.value.species].stage[formData.value.stage].forms[formData.value.forms]
      .name
  console.log(stageName)
  switch (stageName) {
    case 'undead':
      url = getUndeadUrl()
      break
    case 'essence':
      url = getEssenceUrl()
      break
    default:
      url = getDefaultUrl()
      break
  }
  canvasStore.dragon = {
    url: url,
    name: formData.value.animation,
  }
}

function getEssenceUrl() {
  const speciesName = dragonList.value[formData.value.species].name
  const formNumber = formList.value[formData.value.forms].name
  const gender = genderList.value[formData.value.genders].name
  const stage = stageList.value[formData.value.stage].name
  const colorName = genderList.value[formData.value.genders].color
  return `res/spine/character/dragon/essence/${speciesName}_${formNumber}_${gender}_${stage}_${colorName}/${speciesName}_${formNumber}_${gender}_${stage}_${colorName}`
}

function getUndeadUrl() {
  const undeadres = genderList.value[formData.value.genders].undeadres
  console.log(undeadres)

  return `res/spine/character/dragon/undead/undead_${undeadres}/undead_${undeadres}`
}

function getDefaultUrl() {
  const speciesName = dragonList.value[formData.value.species].name
  const formNumber = formList.value[formData.value.forms].name
  const gender = genderList.value[formData.value.genders].name
  const stage = stageList.value[formData.value.stage].name
  const colorName = genderList.value[formData.value.genders].color
  return `res/spine/character/dragon/${speciesName}_${formNumber}_${gender}_${stage}_${colorName}/${speciesName}_${formNumber}_${gender}_${stage}_${colorName}`
}

function handleDragonLtClick() {
  if (formData.value.species > 0) formData.value.species--
}
function handleDragonGtClick() {
  formData.value.species++
}
</script>

<style lang="css" scoped>
.animation-radios {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
