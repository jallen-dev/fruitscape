import { Sprite } from "@pixi/react"

type LocationMarkerProps = {
  location: { x: number; y: number }
  destination: { x: number; y: number }
}

export function LocationMarker({ location, destination }: LocationMarkerProps) {
  if (location.x === destination.x && location.y === destination.y) {
    return null
  }

  return <Sprite image="1_60.png" x={destination.x * 32} y={destination.y * 32} anchor={{ x: 0, y: 0 }} scale={2} />
}
