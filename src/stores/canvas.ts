import { defineStore } from 'pinia'

export const useCanvasStore = defineStore({
  id: 'canvas',
  state: () => ({
    backAura: { url: '', name: '' },
    frontAura: { url: '', name: '' },
    background: { url: '', name: '' },
    dragon: { url: '', name: '' },
    floor: { url: '', name: '' },
  }),
})
