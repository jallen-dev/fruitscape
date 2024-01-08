import { PlayerId } from "rune-games-sdk"
import { generateNPCs, generateRecipe, setNpcsFruits, shuffle } from "../utils"
import { GameState } from "./types"
import { createPlayer } from "./createPlayer"
import { ALL_FRUIT_TYPES } from "../models/Fruit"

export function setup(allPlayerIds: PlayerId[]) {
  const fruits = shuffle([...ALL_FRUIT_TYPES])
  const uniqueFruits = 4
  const startingFruits = fruits.slice(0, uniqueFruits)

  const gameState: GameState = {
    fruits,
    uniqueFruits,
    npcs: generateNPCs(),
    currentRecipe: generateRecipe(startingFruits, 4),
    recipesCompleted: 0,
    contributedIngredients: {},
    events: [],
    eventId: 0,
    players: {},
    gameId: Math.random(),
  }

  setNpcsFruits(gameState)

  for (const playerId of allPlayerIds) {
    gameState.players[playerId] = createPlayer(playerId, gameState)
  }

  return gameState
}
