import { create } from "zustand"
import { GameState } from "./logic/types"
import { Player, PlayerId } from "rune-games-sdk"
import { subscribeWithSelector } from "zustand/middleware"

interface State {
  tileNames?: string[]
  game: GameState
  players: Record<PlayerId, Player>
  yourPlayerId: string
  destination?: { x: number; y: number }
  initialized: boolean
  assetsLoaded: boolean
  tradeOpen: boolean
  recipeOpen: boolean
  tradePartner?: string
}

interface Actions {
  setTileNames: (tileNames: string[]) => void
  setGame: (game: GameState) => void
  setPlayers: (players: Record<PlayerId, Player>) => void
  setYourPlayerId: (yourPlayerId: string) => void
  setInitialized: (initialized: boolean) => void
  setAssetsLoaded: (loaded: boolean) => void
  setDestination: (destination: { x: number; y: number }) => void
  setTradeOpen: (tradeOpen: boolean) => void
  setRecipeOpen: (recipeOpen: boolean) => void
  setTradePartner: (tradePartner: string) => void
}

export const useStore = create<State & Actions>()(
  subscribeWithSelector((set) => ({
    yourPlayerId: "",
    initialized: false,
    assetsLoaded: false,
    tradeOpen: false,
    recipeOpen: false,
    players: {},
    game: {
      players: {},
      npcs: {},
      currentRecipe: {},
      contributedIngredients: {},
      events: [],
      eventId: 0,
    },
    setTileNames: (tileNames) => set({ tileNames }),
    setGame: (game) => set({ game }),
    setPlayers: (players) => set({ players }),
    setYourPlayerId: (yourPlayerId) => set({ yourPlayerId }),
    setInitialized: (initialized) => set({ initialized }),
    setAssetsLoaded: (assetsLoaded) => set({ assetsLoaded }),
    setDestination: (destination) => set({ destination }),
    setTradeOpen: (tradeOpen) => set({ tradeOpen }),
    setRecipeOpen: (recipeOpen) => set({ recipeOpen }),
    setTradePartner: (tradePartner) => set({ tradePartner }),
  }))
)
