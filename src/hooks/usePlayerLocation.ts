import { MAP_HEIGHT, MAP_WIDTH } from "@/constants"
import { useStore } from "@/store"
import { useApp } from "@pixi/react"

const HALF_TILE = 16

export function usePlayerLocation(playerId?: string) {
  const players = useStore((state) => state.game.players)

  const app = useApp()
  const width = app.screen.width
  const height = app.screen.height

  if (!playerId) {
    const x = -Math.floor(MAP_WIDTH / 2) * 32 + width / 2 - HALF_TILE
    const y = -Math.floor(MAP_HEIGHT / 2) * 32 + height / 2
    return { x, y }
  }

  const player = players[playerId]
  const x = -player.location.x * 32 + width / 2 - HALF_TILE
  const y = -player.location.y * 32 + height / 2
  return { x, y }
}
