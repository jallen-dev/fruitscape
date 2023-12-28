import { create } from "zustand";
import { Player } from "./logic/Player";

interface State {
  tileNames: string[];
  players: Player[];
  yourPlayerId: string;
}

interface Actions {
  setTileNames: (tileNames: string[]) => void;
  setPlayers: (players: Player[]) => void;
  setYourPlayerId: (yourPlayerId: string) => void;
}

export const useStore = create<State & Actions>()((set) => ({
  tileNames: [],
  players: [],
  yourPlayerId: "",
  setTileNames: (tileNames) => set({ tileNames }),
  setPlayers: (players) => set({ players }),
  setYourPlayerId: (yourPlayerId) => set({ yourPlayerId }),
}));
