import { create } from "zustand";

interface State {
  tileNames: string[];
}

interface Actions {
  setTileNames: (tileNames: string[]) => void;
}

export const useStore = create<State & Actions>()((set) => ({
  tileNames: [],
  setTileNames: (tileNames) => set({ tileNames }),
}));
