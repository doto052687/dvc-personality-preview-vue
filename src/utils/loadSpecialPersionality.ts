import { SpecialPersonality, Color } from '@/models/dictModels'
import { onMounted, reactive } from 'vue'
import { myownbackJson } from '@pspe/dict/myownbackdict'
import { myownfrontJson } from '@pspe/dict/myownfrontdict'
import { myheartbackJson } from '@pspe/dict/myheartbackdict'
import { myheartfrontJson } from '@pspe/dict/myheartfrontdict'
import _ from 'lodash'

/**
 * read myOwn and myHeart personality dict
 * @returns MyHeartList:SpecialPersonality[]
 * @returns MyOwnList:SpecialPersonality[]
 */
export function useLoadSpecialPersonality() {
  const MyOwnList = reactive<{ front: SpecialPersonality[]; back: SpecialPersonality[] }>({
    front: [],
    back: [],
  })
  const MyHeartList = reactive<{ front: SpecialPersonality[]; back: SpecialPersonality[] }>({
    front: [],
    back: [],
  })

  onMounted(() => {
    setMyOwn()
    setMyHeart()
  })

  function setMyOwn() {
    // back
    MyOwnList.back = _.map(myownbackJson, (colors, name) => {
      const myHeart = new SpecialPersonality()
      myHeart.name = name
      myHeart.color = _.map(colors, (value, key) => {
        const color = new Color()
        color.name = key
        color.value = value
        return color
      })
      return myHeart
    })
    // front
    MyOwnList.front = _.map(myownfrontJson, (colors, name) => {
      const myHeart = new SpecialPersonality()
      myHeart.name = name
      myHeart.color = _.map(colors, (value, key) => {
        const color = new Color()
        color.name = key
        color.value = value
        return color
      })
      return myHeart
    })
  }

  function setMyHeart() {
    // back
    MyHeartList.back = _.map(myheartbackJson, (colors, name) => {
      const myHeart = new SpecialPersonality()
      myHeart.name = name
      myHeart.color = _.map(colors, (value, key) => {
        const color = new Color()
        color.name = key
        color.value = value
        return color
      })
      return myHeart
    })
    // front
    MyHeartList.front = _.map(myheartfrontJson, (colors, name) => {
      const myHeart = new SpecialPersonality()
      myHeart.name = name
      myHeart.color = _.map(colors, (value, key) => {
        const color = new Color()
        color.name = key
        color.value = value
        return color
      })
      return myHeart
    })
  }

  return {
    MyHeartList,
    MyOwnList,
  }
}
