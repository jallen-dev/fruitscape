import { GameState } from "./types"

export function update({ game }: { game: GameState }) {
  // expire events
  const now = Rune.gameTime()
  game.events = game.events.filter((event) => now - event.time < 3000)

  // move players
  for (const player of Object.values(game.players)) {
    if (!player.path.length) {
      continue
    }

    const [x, y] = player.path.shift()!

    player.location.x = x
    player.location.y = y
  }
}
