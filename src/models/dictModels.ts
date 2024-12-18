export class Personality {
  name!: string
  back!: string
  front!: string
  each?: string
}

export class CaveBg {
  name!: string
  res!: string
}

export class CaveFloor {
  name!: string
  res!: string
}

export class Dragon {
  name!: string
  speciesDisplay!: string
  stage: Stage[] = []
}
export class Gender {
  name!: string
  color?: string
  undeadres?: string
}
export class Form {
  name!: string
  formDisplay!: string
  genders: Gender[] = []
}
export class Stage {
  name!: string
  forms: Form[] = []
}
