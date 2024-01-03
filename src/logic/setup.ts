import { PlayerId } from "rune-games-sdk"
import { generateFruit, generateNPCs, generateRecipe } from "../utils"
import { GameState } from "./types"
import { createPlayer } from "./createPlayer"

export function setup(allPlayerIds: PlayerId[]) {
  const startingFruits = generateFruit(4)

  const gameState: GameState = {
    fruits: startingFruits,
    npcs: generateNPCs(startingFruits),
    currentRecipe: generateRecipe(startingFruits),
    contributedIngredients: {},
    events: [],
    eventId: 0,
    players: {},
  }

  for (const playerId of allPlayerIds) {
    gameState.players[playerId] = createPlayer(playerId, gameState)
  }

  return gameState
}
