import { useStore } from "@/store"
import { Sprite } from "@pixi/react"

export function LocationMarker() {
  const yourPlayerId = useStore((state) => state.yourPlayerId)
  const players = useStore((state) => state.game.players)

  if (!yourPlayerId) {
    return null
  }

  const { location, destination } = players[yourPlayerId]

  if (location.x === destination.x && location.y === destination.y) {
    return null
  }

  return <Sprite image="1_60.png" x={destination.x * 16} y={destination.y * 16} />
}
