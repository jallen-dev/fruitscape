import { PlayerId } from "rune-games-sdk"
import { Player } from "../models/Player"
import { FruitType } from "../models/Fruit"
import { Npc } from "../models/Npc"
import { Event } from "../models/Event"

export interface GameState {
  players: Record<PlayerId, Player>
  npcs: Record<string, Npc>
  currentRecipe: Partial<Record<FruitType, number>>
  contributedIngredients: Partial<Record<FruitType, number>>
  events: Event[]
  eventId: number
  fruits: FruitType[]
}

export type GameActions = {
  setDestination: (params: { playerId: string; destination: { x: number; y: number } }) => void
  addFruit: (params: { fruit: FruitType }) => void
  tradeFruit: (params: { exchangedFruit: FruitType; forFruit: FruitType }) => void
}
