import { Sprite } from "@pixi/react"
import { useStore } from "../store"

export function LocationMarker() {
  const game = useStore((state) => state.game)
  const assetsLoaded = useStore((state) => state.assetsLoaded)
  const playerId = useStore((state) => state.yourPlayerId)

  if (!assetsLoaded) {
    return null
  }

  const player = game.players[playerId]

  if (!player) {
    return null
  }

  if (player.location.x === player.destination.x && player.location.y === player.destination.y) {
    return null
  }

  return (
    <Sprite
      image="1_60.png"
      x={player.destination.x * 32}
      y={player.destination.y * 32}
      anchor={{ x: 0, y: 0 }}
      scale={2}
    />
  )
}
