import { FruitType } from "../models/Fruit"
import { ContextWithGameState, ActionContext } from "rune-games-sdk"
import { GameState } from "./types"

export function tradeFruit(
  { exchangedFruit, forFruit }: { exchangedFruit: FruitType; forFruit: FruitType },
  { game, playerId }: ContextWithGameState<ActionContext, GameState>
) {
  const player = game.players[playerId]
  if (!player.inventory[exchangedFruit]) {
    return
  }
  if (!player.inventory[forFruit]) {
    player.inventory[forFruit] = 0
  }
  player.inventory[exchangedFruit]! -= 1
  if (player.inventory[exchangedFruit] === 0) {
    delete player.inventory[exchangedFruit]
  }
  player.inventory[forFruit] = (player.inventory[forFruit] ?? 0) + 1
}
