import { FruitType } from "./Fruit"

export type Event = FruitAddedEvent

type FruitAddedEvent = {
  id: number
  time: number
  type: "fruitAdded"
  playerId: string
  fruit: FruitType
  quantity: number
}
