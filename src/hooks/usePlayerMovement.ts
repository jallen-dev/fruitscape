import { useEffect } from "react"
import { MAP_WIDTH, MAP_HEIGHT } from "../constants"
import { useStore } from "../store"
import { playSound } from "../playSound"

export function usePlayerMovement(playerId: string) {
  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (state) => state.game.players[playerId],
      (player, prevPlayer) => {
        if (player.location.x === prevPlayer.location.x && player.location.y === prevPlayer.location.y) {
          // player has not moved
          return
        }

        if (player.path.length > 0) {
          // player is still moving
          return
        }

        // player has reached their destination.
        // check if they are standing on the chest
        if (player.location.x === Math.floor(MAP_WIDTH / 2) && player.location.y === Math.floor(MAP_HEIGHT / 2)) {
          useStore.getState().setRecipeOpen(true)
          playSound("openChest")
        }

        // check if there's an NPC there
        for (const npc of Object.values(useStore.getState().game.npcs)) {
          if (npc.location.x === player.location.x && npc.location.y === player.location.y) {
            useStore.getState().setTradeOpen(true)
            useStore.getState().setTradePartner(npc.id)
            playSound("openDialog")
            return
          }
        }
      }
    )

    return unsubscribe
  }, [playerId])
}
