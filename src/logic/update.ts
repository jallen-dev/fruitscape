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

    if (player.location.x < player.destination.x) {
      player.location.x += 1
    }
    if (player.location.x > player.destination.x) {
      player.location.x -= 1
    }
    if (player.location.y < player.destination.y) {
      player.location.y += 1
    }
    if (player.location.y > player.destination.y) {
      player.location.y -= 1
    }
  }
}
