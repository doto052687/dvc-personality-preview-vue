import { CaveFloor, type CaveBg, type Personality } from '@/models/dictModels'
import { onMounted, ref } from 'vue'
import { personalityJson } from '@pspe/dict/personalitydict'
import { cavebgJson } from '@pspe/dict/cavebgdict'
import { cavefloorJson } from '@pspe/dict/cavefloordict'
import _ from 'lodash'
export function useLoadDict() {
  const personalityList = ref<Personality[]>([])
  const CaveBgList = ref<CaveBg[]>([])
  const CaveFloorList = ref<CaveFloor[]>([])

  onMounted(() => {
    setPersonalityList()
    setCaveBgList()
    setCaveFloorList()
  })

  function setPersonalityList() {
    personalityList.value = _.chain(personalityJson)
    .map((value: any, key) => ({
      name: key,
      back: value.back,
      front: value.front,
      each: value.each,
    }))
    .filter(item => !item.name.includes('(') && !item.name.includes('['))
    .value();
    }

  function setCaveBgList() {
    CaveBgList.value = _.map(cavebgJson, (value:any, key) => ({
      name: key,
      res: value.res,
    }))
  }

  function setCaveFloorList() {
    CaveFloorList.value = _.map(cavefloorJson, (value:any, key) => ({
      name: key,
      res: value.res,
    }))
  }

  return {
    personalityList,
    CaveBgList,
    CaveFloorList,
  }
}
