import { onMounted, ref } from 'vue'
import { speciesJson } from '@pspe/dict/dragondict'
import _ from 'lodash'
import type { Dragon } from '@/models/dictModels'

export function useLoadDragon() {
  const dragonList = ref<Dragon[]>([])

  onMounted(() => {
    setDragonList()
  })

  function setDragonList() {
    dragonList.value = _.map(speciesJson, (species:any,key) => ({
      speciesDisplay: species.speciesDisplay,
      name: key,
      stage: _.map(species.stage, (stage:any, key) => ({
        name: key,
        forms: _.map(stage.forms, (form:any, key) => ({
          name: key,
          formDisplay: form.formDisplay,
          genders: _.map(form.genders, (gender:any,key) => ({
            name: key,
            color: gender.color,
            undeadres: gender.undeadres,
          })),
        })),
      })),
    }))
  }

  return {
    dragonList,
  }
}
