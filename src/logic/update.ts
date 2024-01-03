import { useStore } from "../store"
import { GameState } from "./types"

export function update({ game }: { game: GameState }) {
  // expire events
  const now = Rune.gameTime()
  game.events = game.events.filter((event) => now - event.time < 3000)

  // move players
  for (const player of Object.values(game.players)) {
    if (player.location.x === player.destination.x && player.location.y === player.destination.y) {
      continue
    }

    const result = useStore.getState().aStarFinder.findPath(player.location, player.destination)
    if (result.length < 1) {
      player.destination = player.location
      continue
    }

    const [x, y] = result[0]
    player.location.x = x
    player.location.y = y
  }
}
