import type { RuneClient } from "rune-games-sdk/multiplayer"

import { trycatch } from "./trycatch"

export interface GameState {
  count: number
  color: string
}

type GameActions = {
  increment: (params: { amount: number }) => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

export function getCount(game: GameState) {
  return game.count
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
  setup: (): GameState => {
    return { count: 0, color: "red" }
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount

      // set color to a random color
      // will desync if you click a couple times
      game.color = shuffle(colors)[0]

      // eslint complains about this
      try {
        console.log("Hello World")
      } catch (e) {
        console.error(e)
      }

      // but not this
      trycatch()
    },
  },
})

const colors = ["red", "blue", "green", "yellow"]

function shuffle<T>(array: T[]) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}
