import { create } from "zustand"
import { GameState } from "./logic/types"
import { Player, PlayerId } from "rune-games-sdk"
import { subscribeWithSelector } from "zustand/middleware"
import { AStarFinder } from "astar-typescript"
import { Screen } from "./types"

interface State {
  tileNames?: string[]
  game: GameState
  playerDetails: Record<PlayerId, Player>
  yourPlayerId: string
  initialized: boolean
  assetsLoaded: boolean
  tradeOpen: boolean
  recipeOpen: boolean
  tradePartner?: string
  obstacleMap: number[][]
  aStarFinder: AStarFinder
  screen: Screen
}

interface Actions {
  setTradeOpen: (tradeOpen: boolean) => void
  setRecipeOpen: (recipeOpen: boolean) => void
  setTradePartner: (tradePartner: string) => void
  setScreen: (screen: Screen) => void
}

export const useStore = create<State & Actions>()(
  subscribeWithSelector((set) => ({
    yourPlayerId: "",
    initialized: false,
    assetsLoaded: false,
    tradeOpen: false,
    recipeOpen: false,
    playerDetails: {},
    game: {
      players: {},
      npcs: {},
      fruits: [],
      uniqueFruits: 0,
      recipesCompleted: 0,
      currentRecipe: {},
      contributedIngredients: {},
      events: [],
      eventId: 0,
    },
    obstacleMap: [],
    aStarFinder: new AStarFinder({ grid: { matrix: [[]] } }),
    screen: "characterSelect",
    setTradeOpen: (tradeOpen) => set({ tradeOpen }),
    setRecipeOpen: (recipeOpen) => set({ recipeOpen }),
    setTradePartner: (tradePartner) => set({ tradePartner }),
    setScreen: (screen) => set({ screen }),
  }))
)
