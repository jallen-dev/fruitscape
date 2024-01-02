import { useStore } from "../store"
import { Character } from "./Character"

export function Player() {
  const game = useStore((state) => state.game)
  const playerDetails = useStore((state) => state.playerDetails)
  const playerId = useStore((state) => state.yourPlayerId)

  const player = game.players[playerId]

  if (!player) {
    return null
  }

  const playerInfo = playerDetails[playerId]

  return <Character character={player.character} name={playerInfo.displayName} />
}
