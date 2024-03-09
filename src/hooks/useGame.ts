import { useStore } from "@/store"
import { useApp } from "@pixi/react"

export function useGame() {
  const app = useApp()
  app.resizeTo = window

  const yourPlayerId = useStore((state) => state.yourPlayerId)
  const players = useStore((state) => state.game.players)

  return { yourPlayerId, players }
}
