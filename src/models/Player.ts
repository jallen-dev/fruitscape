import { CharacterType } from "./Character"
import { FruitType } from "./Fruit"

export type Player = {
  id: string
  location: { x: number; y: number }
  destination: { x: number; y: number }
  character: CharacterType
  score: number
  inventory: Partial<Record<FruitType, number>>
}
