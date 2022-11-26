export interface Motor {
  id: number
  name: string
  description: string
  position: number
  min: number
  max: number
  default: number
  inverted: boolean
}
