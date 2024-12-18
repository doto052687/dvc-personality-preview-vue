export class LeftForm {
  personality: number = 0
  caveBg: number = 0
  caveFloor: number = 0
  bgState: 'idle' | '' = 'idle'
  bgBrightness: 1 | 0.5 = 1
  floorState: 'idle' | '' = 'idle'
}
export class RightForm {
  species: number = 0
  stage: number = 0
  forms: number=0
  genders: number = 0
  animation: 'idle' | 'move' | 'holding' | 'touch' | '' = 'idle'
}
