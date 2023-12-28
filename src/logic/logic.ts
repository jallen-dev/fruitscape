import type { RuneClient } from "rune-games-sdk/multiplayer";
import { ALL_CHARACTERS } from "../characters";
import { Player } from "./Player";
import { TileMapData, generateBackground, generateObjects } from "../maps";

export interface GameState {
  count: number;
  players: Player[];
  background: TileMapData;
  objects: TileMapData;
}

type GameActions = {
  increment: (params: { amount: number }) => void;
  movePlayer: (params: { playerId: string; location: { x: number; y: number } }) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

export function getCount(game: GameState) {
  return game.count;
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
  setup: (allPlayerIds): GameState => {
    return {
      count: 0,
      players: allPlayerIds.map((playerId, index) => ({
        playerId,
        location: { x: 0, y: 0 },
        character: ALL_CHARACTERS[Math.floor(Math.random() * ALL_CHARACTERS.length)],
        score: 0,
      })),
      background: generateBackground(),
      objects: generateObjects(),
    };
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount;
    },
    movePlayer: ({ playerId, location }, { game }) => {
      game.players.find((player) => player.playerId === playerId)!.location = location;
    },
  },
});
