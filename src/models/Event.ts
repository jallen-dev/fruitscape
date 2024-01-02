import { FruitType } from "./Fruit"

export type Event = FruitAddedEvent | RecipeCompletedEvent | FruitGrantedEvent

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

type FruitGrantedEvent = {
  id: number
  time: number
  type: "fruitGranted"
  playerId: string
  fruit: FruitType
  quantity: number
}
