export const PreComposition = 'precomposition'
export enum LayerType {
  Image = 'image',
  Video = 'video',
  Text = 'text',
  Vector = 'vector',
  ShapeLayer = 'ShapeLayer',
  Ellipse = 'Ellipse',
  Rect = 'Rect',
  Path = 'Path',
}

export enum PlayState {
  None = 0,
  Play,
}

export interface FrameInfo {
  frames: number
  frameId: number
  width: number
  height: number
  opacity: number // 父级的透明度
}

export interface TransformProps {
  anchorPoint: {
    inFrame: number
    value: number[]
    timeFunc?: number
  }[]
  position: {
    inFrame: number
    value: number[]
    timeFunc?: number
  }[]
  scale: {
    inFrame: number
    value: number[]
    timeFunc?: number
  }[]
  opacity: {
    inFrame: number
    value: number
    timeFunc?: number
  }[]
  rotationX?: {
    inFrame: number
    value: number
    timeFunc?: number
  }[]
  rotationY?: {
    inFrame: number
    value: number
    timeFunc?: number
  }[]
  rotationZ?: {
    inFrame: number
    value: number
    timeFunc?: number
  }[]
  orientation?: {
    inFrame: number
    value: number[]
    timeFunc?: number
  }[]
}

export enum TrackMatteType {
  None = 0,
  ALPHA = 1,
  ALPHA_INVERTED = 2,
  LUMA = 3,
  LUMA_INVERTED = 4,
}

export interface LayerBaseProps {
  id: number
  type: string
  name?: string
  transform: TransformProps
  width: number
  height: number
  inFrame: number
  outFrame: number
  isTrackMatte?: boolean
  trackMatteLayer?: number
  trackMatteType?: TrackMatteType
}

export type LayerImageProps = {
  content: string
  fillMode?: number
} & LayerBaseProps

export type LayerVideoProps = {
  content: string
  isAlpha?: boolean
} & LayerBaseProps

export type LayerTextProps = {
  textDocAttr: {
    text: string
    textColor: number[]
    font: string
    fontFamily: string
    fontSize: number
    fontStyle: string
    fauxBold?: boolean
    fauxItalic?: boolean
    lineSpacing?: number
    wordSpacing?: number
    textAligment?: number
    orientation?: number
  }
  content: string
} & LayerBaseProps

interface ShapeFillInfo {
  blendMode?: number
  color: [number, number, number, number]
  opacity: number
}

interface ShapeStrokeInfo {
  blendMode?: number
  color: [number, number, number, number]
  opacity: number
  width: number
  lineCap: number
  lineJoin: number
  miterLimit: number
  dashesInfo?: {
    dash: number[]
    offset: [{inFrame: number; value: number; timeFunc?: number}]
  }
}

export type LayerPathProps = {
  name?: string
  blendMode?: number
  elements: {
    shapeInfo: {
      points: Array<[number, number]>
      actions: number[]
    }
    strokeInfo?: ShapeStrokeInfo
    fillInfo?: ShapeFillInfo
  }
} & LayerBaseProps

export type LayerRectProps = {
  name?: string
  blendMode?: number
  elements: {
    rectInfo: {
      direction?: number
      size: [number, number]
      position: [number, number]
      roundness?: number
    }
    strokeInfo?: ShapeStrokeInfo
    fillInfo?: ShapeFillInfo
  }
  transform: TransformProps
} & LayerBaseProps

export type LayerEllipseProps = {
  name?: string
  blendMode?: number
  elements: {
    ellipseInfo: {
      direction?: number
      size: [number, number]
      position: [number, number]
    }
    strokeInfo?: ShapeStrokeInfo
    fillInfo?: ShapeFillInfo
  }
} & LayerBaseProps

export type LayerShapeProps = {
  content: Array<LayerRectProps | LayerEllipseProps | LayerPathProps>
} & LayerBaseProps

export type LayerVectorProps = {
  layers: LayerProps[]
} & LayerBaseProps

export type LayerProps =
  | LayerImageProps
  | LayerVideoProps
  | LayerTextProps
  | LayerShapeProps
  | LayerVectorProps
  | LayerRectProps
  | LayerEllipseProps
  | LayerPathProps

export interface PlayProps {
  width: number
  height: number
  duration: number // 秒
  frameRate: number
  targetComp: {
    layers: LayerProps[]
  }
  comps: LayerProps[]
}
