import { PlayerId } from "rune-games-sdk"

import { MAP_HEIGHT, MAP_WIDTH } from "../constants"
import { ALL_CHARACTER_TYPES } from "../models/Character"
import { GameState } from "./types"

export function createPlayer(id: PlayerId, game: GameState) {
  const startingLocation = getEmptyStartingLocation(game)
  const fruitsInPlay = game.fruits.slice(0, game.uniqueFruits)
  const randomFruit = fruitsInPlay[Math.floor(Math.random() * fruitsInPlay.length)]

  return {
    id,
    location: startingLocation,
    destination: startingLocation,
    path: [],
    character: ALL_CHARACTER_TYPES[Math.floor(Math.random() * ALL_CHARACTER_TYPES.length)],
    score: 0,
    inventory: { [randomFruit]: 10 },
  }
}

function getEmptyStartingLocation(game: GameState) {
  const playerLocations = Object.values(game.players).map((player) => player.location)
  for (const startingLocation of STARTING_LOCATIONS) {
    if (!playerLocations.some((location) => location.x === startingLocation.x && location.y === startingLocation.y)) {
      return startingLocation
    }
  }

  return { x: 0, y: 0 }
}

const STARTING_LOCATIONS = [
  { x: Math.floor(MAP_WIDTH / 2) - 1, y: Math.floor(MAP_HEIGHT / 2) },
  { x: Math.floor(MAP_WIDTH / 2) + 1, y: Math.floor(MAP_HEIGHT / 2) },
  { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) - 1 },
  { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) + 1 },
] as const
