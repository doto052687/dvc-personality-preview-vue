import {
  AnimationState,
  AnimationStateData,
  AtlasAttachmentLoader,
  ResizeMode,
  Skeleton,
  SkeletonBinary,
  SpineCanvas,
  type SpineCanvasApp,
} from '@esotericsoftware/spine-webgl'

export class SpineObject implements SpineCanvasApp {
  skeleton: null | Skeleton
  animationState: null | AnimationState
  binaryUrl: string
  atlasUrl: string
  initialAnimation: string
  skeletonBinary: null | SkeletonBinary
  skeletonScale: null | number

  constructor(spineUrl: string, initialAnimation: string) {
    this.skeleton = null
    this.animationState = null
    this.binaryUrl = spineUrl + '.skel'
    this.atlasUrl = spineUrl + '.atlas'
    this.initialAnimation = initialAnimation
    this.skeletonBinary = null
    this.skeletonScale = null
  }

  loadAssets(canvas: SpineCanvas) {
    // Load the skeleton file.
    canvas.assetManager.loadBinary(this.binaryUrl)
    // Load the atlas and its pages.
    canvas.assetManager.loadTextureAtlas(this.atlasUrl)
  }

  initialize(canvas: SpineCanvas) {
    let assetManager = canvas.assetManager
    // Create the texture atlas.
    let atlas = assetManager.require(this.atlasUrl)

    // Create a AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
    let atlasLoader = new AtlasAttachmentLoader(atlas)

    // Create a SkeletonBinary instance for parsing the .skel file.
    let skeletonBinary = new SkeletonBinary(atlasLoader)
    this.skeletonBinary = skeletonBinary

    // Set the scale to apply during parsing, parse the file, and create a new skeleton.
    this.applyProperScale()
    if (this.skeletonScale) skeletonBinary.scale = this.skeletonScale
    let skeletonData = skeletonBinary.readSkeletonData(assetManager.require(this.binaryUrl))
    this.skeleton = new Skeleton(skeletonData)

    // Create an AnimationState, and set the "run" animation in looping mode.
    let animationStateData = new AnimationStateData(skeletonData)
    this.animationState = new AnimationState(animationStateData)
    if (this.initialAnimation && this.initialAnimation !== '')
      this.animationState.setAnimation(0, this.initialAnimation, true)
  }

  update(canvas: SpineCanvas, delta: number) {
    if (this.animationState && this.skeleton) {
      // Update the animation state using the delta time.
      this.animationState.update(delta)

      // Apply the animation state to the skeleton.
      this.animationState.apply(this.skeleton)
      // Let the skeleton update the transforms of its bones.
      this.skeleton.updateWorldTransform()
    }
  }

  render(canvas: SpineCanvas) {
    let renderer = canvas.renderer
    // Resize the viewport to the full canvas.
    renderer.resize(ResizeMode.Expand)

    // Clear the canvas with a light gray color.
    canvas.clear(0, 0, 0, 0)

    // Begin rendering.
    renderer.begin()
    // Draw the skeleton
    if (this.skeleton) renderer.drawSkeleton(this.skeleton, false)
    // Complete rendering.
    renderer.end()
  }

  applyProperScale() {
    let isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
    if (isMobile) {
      if (window.devicePixelRatio <= 2) {
        if (window.innerWidth < 500) this.skeletonScale = 1
        else if (window.innerWidth > 800) this.skeletonScale = 2
        else this.skeletonScale = 1.5
      } else if (window.innerWidth < 300) this.skeletonScale = 1
      else this.skeletonScale = 1.5
    } else {
      this.skeletonScale = 0.7
    }

    // console.log(navigator.userAgent)
    // console.log(window.devicePixelRatio)
    // console.log(window.innerWidth)
    // console.log(this.skeletonScale)
  }
}
