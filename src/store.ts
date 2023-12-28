import { create } from "zustand";
import { GameState } from "./logic/logic";
import { Player, PlayerId } from "rune-games-sdk";
import { subscribeWithSelector } from "zustand/middleware";

interface State {
  tileNames?: string[];
  game?: GameState;
  players?: Record<PlayerId, Player>;
  yourPlayerId: string;
  destination?: { x: number; y: number };
  loaded: boolean;
}

interface Actions {
  setTileNames: (tileNames: string[]) => void;
  setGame: (game: GameState) => void;
  setPlayers: (players: Record<PlayerId, Player>) => void;
  setYourPlayerId: (yourPlayerId: string) => void;
  setLoaded: (loaded: boolean) => void;
  setDestination: (destination: { x: number; y: number }) => void;
}

export const useStore = create<State & Actions>()(
  subscribeWithSelector((set) => ({
    yourPlayerId: "",
    loaded: false,
    setTileNames: (tileNames) => set({ tileNames }),
    setGame: (game) => set({ game }),
    setPlayers: (players) => set({ players }),
    setYourPlayerId: (yourPlayerId) => set({ yourPlayerId }),
    setLoaded: (loaded) => set({ loaded }),
    setDestination: (destination) => set({ destination }),
  }))
);
