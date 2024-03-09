import type { RuneClient } from "rune-games-sdk/multiplayer"

import { addFruit } from "./addFruit"
import { createPlayer } from "./createPlayer"
import { setup } from "./setup"
import { tradeFruit } from "./tradeFruit"
import { GameActions, GameState } from "./types"
import { update } from "./update"

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 6,
  setup,
  update,
  actions: {
    setDestination: ({ playerId, path }, { game }) => {
      game.players[playerId].path = path
      let x, y
      if (!path.length) {
        x = game.players[playerId].location.x
        y = game.players[playerId].location.y
      } else {
        x = path[path.length - 1][0]
        y = path[path.length - 1][1]
      }
      game.players[playerId].destination = { x, y }
    },
    addFruit,
    tradeFruit,
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
