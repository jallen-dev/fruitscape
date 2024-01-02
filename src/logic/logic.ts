import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer"
import { ALL_CHARACTER_TYPES } from "../models/Character"
import { Player } from "./Player"
import { FruitType } from "../models/Fruit"
import { MAP_WIDTH, MAP_HEIGHT } from "../constants"
import { generateFruit, generateNPCs, generateRecipe } from "../utils"
import { Npc } from "../models/Npc"
import { Event } from "../models/Event"

export interface GameState {
  count: number
  players: Record<PlayerId, Player>
  npcs: Record<string, Npc>
  currentRecipe: Partial<Record<FruitType, number>>
  contributedIngredients: Partial<Record<FruitType, number>>
  events: Event[]
  eventId: number
}

type GameActions = {
  increment: (params: { amount: number }) => void
  setDestination: (params: { playerId: string; destination: { x: number; y: number } }) => void
  addFruit: (params: { playerId: string; fruit: FruitType }) => void
  tradeFruit: (params: { playerId: string; exchangedFruit: FruitType; forFruit: FruitType }) => void
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
  setup: (allPlayerIds): GameState => {
    const startingFruits = generateFruit(4)

    return {
      count: 0,
      players: allPlayerIds.reduce((acc, playerId, index) => {
        const randomFruit = startingFruits[Math.floor(Math.random() * startingFruits.length)]
        acc[playerId] = {
          playerId,
          location: locationForIndex(index),
          destination: locationForIndex(index),
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
    }
  },
  update: ({ game }) => {
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
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount
    },
    setDestination: ({ playerId, destination }, { game }) => {
      game.players[playerId].destination = destination
    },
    addFruit: ({ playerId, fruit }, { game }) => {
      if (!game.players[playerId].inventory[fruit]) {
        return
      }

      game.players[playerId].inventory[fruit]! -= 1
      if (game.players[playerId].inventory[fruit] === 0) {
        delete game.players[playerId].inventory[fruit]
      }

      game.contributedIngredients[fruit] = (game.contributedIngredients[fruit] ?? 0) + 1
      game.events.push({
        id: game.eventId,
        type: "fruitAdded",
        playerId,
        fruit,
        quantity: 1,
        time: Rune.gameTime(),
      })
      game.eventId += 1

      // check if all the ingredients have been added
      const recipe = game.currentRecipe
      const contributedIngredients = game.contributedIngredients
      for (const [fruit, amount] of Object.entries(recipe)) {
        if (amount > (contributedIngredients[fruit as FruitType] ?? 0)) {
          return
        }
      }

      // generate a new recipe
      const numIngredients = Object.keys(recipe).length + 1
      const newFruits = generateFruit(numIngredients)
      const newRecipe = generateRecipe(newFruits)
      game.currentRecipe = newRecipe
      game.contributedIngredients = {}

      game.events.push({
        id: game.eventId,
        type: "recipeCompleted",
        time: Rune.gameTime(),
      })
      game.eventId += 1
    },
    tradeFruit: ({ playerId, exchangedFruit, forFruit }, { game }) => {
      const player = game.players[playerId]
      if (!player.inventory[exchangedFruit]) {
        return
      }
      if (!player.inventory[forFruit]) {
        player.inventory[forFruit] = 0
      }
      player.inventory[exchangedFruit]! -= 1
      if (player.inventory[exchangedFruit] === 0) {
        delete player.inventory[exchangedFruit]
      }
      player.inventory[forFruit] = (player.inventory[forFruit] ?? 0) + 1
    },
  },
  updatesPerSecond: 8,
})

function locationForIndex(index: number) {
  if (index === 0) {
    return { x: Math.floor(MAP_WIDTH / 2) - 1, y: Math.floor(MAP_HEIGHT / 2) }
  }
  if (index === 1) {
    return { x: Math.floor(MAP_WIDTH / 2) + 1, y: Math.floor(MAP_HEIGHT / 2) }
  }
  if (index === 2) {
    return { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) - 1 }
  }

  return { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) + 1 }
}
