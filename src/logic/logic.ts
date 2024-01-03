import type { RuneClient } from "rune-games-sdk/multiplayer"

import { GameActions, GameState } from "./types"
import { addFruit } from "./addFruit"
import { tradeFruit } from "./tradeFruit"
import { setup } from "./setup"
import { update } from "./update"

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
  setup: setup,
  update: update,
  // TODO: "@rune-games-sdk:9 Game is in game over state, your game should prevent sending additional actions"
  actions: {
    setDestination: ({ playerId, destination }, { game }) => {
      game.players[playerId].destination = destination
    },
    addFruit: addFruit,
    tradeFruit: tradeFruit,
  },
  updatesPerSecond: 8,
})
