import { ActionContext, ContextWithGameState } from "rune-games-sdk"

import { FruitType } from "../models/Fruit"
import { generateRecipe, setNpcsFruits } from "../utils"
import { GameState } from "./types"

type Params = {
  fruit: FruitType
}

export function addFruit({ fruit }: Params, { game, playerId }: ContextWithGameState<ActionContext, GameState>) {
  if (!game.players[playerId].inventory[fruit]) {
    return
  }

  // remove fruit from player inventory
  game.players[playerId].inventory[fruit]! -= 1
  if (game.players[playerId].inventory[fruit] === 0) {
    delete game.players[playerId].inventory[fruit]
  }

  addPlayersFruitToIngredients(game, playerId, fruit)

  if (isAllIngredientsAdded(game)) {
    generateNewRecipe(game)
  }
}

function addPlayersFruitToIngredients(game: GameState, playerId: string, fruit: FruitType) {
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
}

function isAllIngredientsAdded(game: GameState) {
  const contributedIngredients = game.contributedIngredients
  for (const [fruit, amount] of Object.entries(game.currentRecipe)) {
    if (amount > (contributedIngredients[fruit as FruitType] ?? 0)) {
      return false
    }
  }

  return true
}

function generateNewRecipe(game: GameState) {
  game.recipesCompleted += 1
  game.contributedIngredients = {}
  game.uniqueFruits = Math.min(Object.keys(game.npcs).length, game.uniqueFruits + 1)

  const totalIngredients = 4 * (game.recipesCompleted + 1)

  const newRecipe = generateRecipe(game.fruits.slice(0, game.uniqueFruits), totalIngredients)
  game.currentRecipe = newRecipe

  game.events.push({
    id: game.eventId,
    type: "recipeCompleted",
    time: Rune.gameTime(),
  })
  game.eventId += 1

  setNpcsFruits(game)
  givePlayersMoreFruit(totalIngredients, game)
}

function givePlayersMoreFruit(totalIngredients: number, game: GameState) {
  for (const player of Object.values(game.players)) {
    const fruitsInPlay = game.fruits.slice(0, game.uniqueFruits)
    const randomFruit = fruitsInPlay[Math.floor(Math.random() * fruitsInPlay.length)]

    player.inventory[randomFruit] = (player.inventory[randomFruit] ?? 0) + totalIngredients
    // TODO: maybe extract event generation to a function
    game.events.push({
      id: game.eventId,
      type: "fruitGranted",
      playerId: player.id,
      fruit: randomFruit,
      quantity: totalIngredients,
      time: Rune.gameTime(),
    })
    game.eventId += 1
  }
}
