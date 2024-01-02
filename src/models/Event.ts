import { FruitType } from "./Fruit"

export type Event = FruitAddedEvent | RecipeCompletedEvent

type FruitAddedEvent = {
  id: number
  time: number
  type: "fruitAdded"
  playerId: string
  fruit: FruitType
  quantity: number
}

type RecipeCompletedEvent = {
  id: number
  time: number
  type: "recipeCompleted"
}
