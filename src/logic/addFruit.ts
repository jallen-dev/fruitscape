import { FruitType } from "../models/Fruit"
import { ContextWithGameState, ActionContext } from "rune-games-sdk"
import { GameState } from "./types"
import { generateFruit, generateRecipe } from "../utils"

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
  const numIngredients = Object.keys(game.currentRecipe).length + 1
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
}
