import { CaveFloor, type CaveBg, type Personality } from '@/models/dictModels'
import { onMounted, ref } from 'vue'
import { personalityJson } from '../../dict/personalitydict'
import { cavebgJson } from '../../dict/cavebgdict'
import { cavefloorJson } from '../../dict/cavefloordict'
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
    personalityList.value = _.map(personalityJson, (value:any, key) => ({
      name: key,
      back: value.back,
      front: value.front,
      each: value.each,
    }))
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
