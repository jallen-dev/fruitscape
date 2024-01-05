import { useStore } from "../store"
import { Character } from "./Character"

export function Player() {
  const playerId = useStore((state) => state.yourPlayerId)
  const displayName = useStore((state) => state.playerDetails[playerId]?.displayName)
  const character = useStore((state) => state.game.players[playerId]?.character)

  if (!character) {
    return null
  }

  return <Character character={character} name={displayName} />
}
