import { useEffect } from "react"
import { MAP_WIDTH, MAP_HEIGHT } from "../constants"
import { useStore } from "../store"

export function usePlayerMovement(playerId: string) {
  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (state) => state.game.players[playerId],
      (player) => {
        if (player && player.location.x === player.destination.x && player.location.y === player.destination.y) {
          // player has reached their destination.

          // check if they are standing on the chest
          if (player.location.x === Math.floor(MAP_WIDTH / 2) && player.location.y === Math.floor(MAP_HEIGHT / 2)) {
            useStore.getState().setRecipeOpen(true)
          }

          // check if there's an NPC there
          for (const npc of Object.values(useStore.getState().game.npcs)) {
            if (npc.location.x === player.location.x && npc.location.y === player.location.y) {
              useStore.getState().setTradeOpen(true)
              useStore.getState().setTradePartner(npc.id)
              return
            }
          }
        }
      }
    )

    return unsubscribe
  }, [playerId])
}
