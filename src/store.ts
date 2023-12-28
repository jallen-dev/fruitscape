import { create } from "zustand";
import { Player } from "./logic/Player";
import { GameState } from "./logic/logic";

interface State {
  tileNames: string[];
  game?: GameState;
  yourPlayerId: string;
}

interface Actions {
  setTileNames: (tileNames: string[]) => void;
  setGame: (game: GameState) => void;
  setYourPlayerId: (yourPlayerId: string) => void;
}

export const useStore = create<State & Actions>()((set) => ({
  tileNames: [],
  yourPlayerId: "",
  setTileNames: (tileNames) => set({ tileNames }),
  setGame: (game) => set({ game }),
  setYourPlayerId: (yourPlayerId) => set({ yourPlayerId }),
}));
