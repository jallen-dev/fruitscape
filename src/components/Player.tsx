import { useStore } from "../store"
import { Character } from "./Character"

export function Player() {
  const game = useStore((state) => state.game)
  const players = useStore((state) => state.players)
  const playerId = useStore((state) => state.yourPlayerId)

  const player = game.players[playerId]

  if (!player) {
    return null
  }

  const playerInfo = players[playerId]

  return <Character character={player.character} name={playerInfo.displayName} />
}
