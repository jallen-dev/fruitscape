import { CharacterType } from "./Character"
import { FruitType } from "./Fruit"

export type Npc = {
  id: string
  character: CharacterType
  location: { x: number; y: number }
  offeredFruit: FruitType
  desiredFruit: FruitType
}
