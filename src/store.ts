import { create } from "zustand";
import { GameState } from "./logic/logic";

interface State {
  tileNames?: string[];
  game?: GameState;
  yourPlayerId: string;
  destination?: { x: number; y: number };
  loaded: boolean;
}

interface Actions {
  setTileNames: (tileNames: string[]) => void;
  setGame: (game: GameState) => void;
  setYourPlayerId: (yourPlayerId: string) => void;
  setLoaded: (loaded: boolean) => void;
  setDestination: (destination: { x: number; y: number }) => void;
}

export const useStore = create<State & Actions>()((set) => ({
  yourPlayerId: "",
  loaded: false,
  setTileNames: (tileNames) => set({ tileNames }),
  setGame: (game) => set({ game }),
  setYourPlayerId: (yourPlayerId) => set({ yourPlayerId }),
  setLoaded: (loaded) => set({ loaded }),
  setDestination: (destination) => set({ destination }),
}));
