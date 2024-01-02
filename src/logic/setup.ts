import { PlayerId } from "rune-games-sdk"
import { ALL_CHARACTER_TYPES } from "../models/Character"
import { generateFruit, generateNPCs, generateRecipe } from "../utils"
import { GameState } from "./types"
import { Player } from "../models/Player"
import { MAP_WIDTH, MAP_HEIGHT } from "../constants"

export function setup(allPlayerIds: PlayerId[]) {
  const startingFruits = generateFruit(4)

  return {
    players: allPlayerIds.reduce((acc, id, index) => {
      const startingLocation = startingLocationForPlayer(index)
      const randomFruit = startingFruits[Math.floor(Math.random() * startingFruits.length)]
      acc[id] = {
        id,
        location: startingLocation,
        destination: startingLocation,
        character: ALL_CHARACTER_TYPES[Math.floor(Math.random() * ALL_CHARACTER_TYPES.length)],
        score: 0,
        inventory: { [randomFruit]: 10 },
      }
      return acc
    }, {} as Record<PlayerId, Player>),
    npcs: generateNPCs(startingFruits),
    currentRecipe: generateRecipe(startingFruits),
    contributedIngredients: {},
    events: [],
    eventId: 0,
  } as GameState
}

function startingLocationForPlayer(playerIndex: number) {
  if (playerIndex === 0) {
    return { x: Math.floor(MAP_WIDTH / 2) - 1, y: Math.floor(MAP_HEIGHT / 2) }
  }
  if (playerIndex === 1) {
    return { x: Math.floor(MAP_WIDTH / 2) + 1, y: Math.floor(MAP_HEIGHT / 2) }
  }
  if (playerIndex === 2) {
    return { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) - 1 }
  }

  return { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) + 1 }
}
