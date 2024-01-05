import type { RuneClient } from "rune-games-sdk/multiplayer"

import { GameActions, GameState } from "./types"
import { addFruit } from "./addFruit"
import { tradeFruit } from "./tradeFruit"
import { setup } from "./setup"
import { update } from "./update"
import { createPlayer } from "./createPlayer"

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
    setCharacter: ({ playerId, character }, { game }) => {
      game.players[playerId].character = character
    },
  },
  events: {
    playerJoined(playerId, { game }) {
      game.players[playerId] = createPlayer(playerId, game)
    },
    playerLeft(playerId, { game }) {
      delete game.players[playerId]
    },
  },
  updatesPerSecond: 8,
})
