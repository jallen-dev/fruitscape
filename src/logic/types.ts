import { PlayerId } from "rune-games-sdk"

import { CharacterType } from "../models/Character"
import { Event } from "../models/Event"
import { FruitType } from "../models/Fruit"
import { Npc } from "../models/Npc"
import { Player } from "../models/Player"

export interface GameState {
  players: Record<PlayerId, Player>
  npcs: Record<string, Npc>
  currentRecipe: Partial<Record<FruitType, number>>
  contributedIngredients: Partial<Record<FruitType, number>>
  events: Event[]
  eventId: number
  fruits: FruitType[]
  uniqueFruits: number
  recipesCompleted: number
  gameId: number
}

export type GameActions = {
  setDestination: (params: { playerId: string; path: Array<[number, number]> }) => void
  addFruit: (params: { fruit: FruitType }) => void
  tradeFruit: (params: { exchangedFruit: FruitType; forFruit: FruitType }) => void
  setCharacter: (params: { playerId: string; character: CharacterType }) => void
}
