import { FruitType } from "../models/Fruit"
import { ContextWithGameState, ActionContext } from "rune-games-sdk"
import { GameState } from "./types"
import { generateFruit, generateRecipe } from "../utils"

export function addFruit(
  { fruit }: { fruit: FruitType },
  { game, playerId }: ContextWithGameState<ActionContext, GameState>
) {
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
}
