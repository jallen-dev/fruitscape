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
  destination?: { x: number; y: number }
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
  setTileNames: (tileNames: string[]) => void
  setGame: (game: GameState) => void
  setPlayerDetails: (playerDetails: Record<PlayerId, Player>) => void
  setYourPlayerId: (yourPlayerId: string) => void
  setInitialized: (initialized: boolean) => void
  setAssetsLoaded: (loaded: boolean) => void
  setDestination: (destination: { x: number; y: number }) => void
  setTradeOpen: (tradeOpen: boolean) => void
  setRecipeOpen: (recipeOpen: boolean) => void
  setTradePartner: (tradePartner: string) => void
  setObstacleMap: (obstacleMap: number[][]) => void
  setAStarFinder: (aStarFinder: AStarFinder) => void
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
      currentRecipe: {},
      contributedIngredients: {},
      events: [],
      eventId: 0,
    },
    obstacleMap: [],
    aStarFinder: new AStarFinder({ grid: { matrix: [[]] } }),
    screen: "characterSelect",
    setTileNames: (tileNames) => set({ tileNames }),
    setGame: (game) => set({ game }),
    setPlayerDetails: (playerDetails) => set({ playerDetails }),
    setYourPlayerId: (yourPlayerId) => set({ yourPlayerId }),
    setInitialized: (initialized) => set({ initialized }),
    setAssetsLoaded: (assetsLoaded) => set({ assetsLoaded }),
    setDestination: (destination) => set({ destination }),
    setTradeOpen: (tradeOpen) => set({ tradeOpen }),
    setRecipeOpen: (recipeOpen) => set({ recipeOpen }),
    setTradePartner: (tradePartner) => set({ tradePartner }),
    setObstacleMap: (obstacleMap) => set({ obstacleMap }),
    setAStarFinder: (aStarFinder) => set({ aStarFinder }),
    setScreen: (screen) => set({ screen }),
  }))
)
