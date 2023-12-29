import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer";
import { ALL_CHARACTER_TYPES } from "../models/Character";
import { Player } from "./Player";
import { ALL_FRUIT_TYPES } from "../models/Fruit";
import { MAP_WIDTH, MAP_HEIGHT } from "../constants";
import { NPC, TileMapData, generateNPCs, generateBackground, generateObjects } from "../utils";

export interface GameState {
  count: number;
  players: Record<PlayerId, Player>;
  npcs: NPC[];
  background: TileMapData;
  objects: TileMapData;
}

type GameActions = {
  increment: (params: { amount: number }) => void;
  setDestination: (params: { playerId: string; destination: { x: number; y: number } }) => void;
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
      players: allPlayerIds.reduce((acc, playerId, index) => {
        const randomFruit = ALL_FRUIT_TYPES[Math.floor(Math.random() * ALL_FRUIT_TYPES.length)];
        acc[playerId] = {
          playerId,
          location: locationForIndex(index),
          destination: locationForIndex(index),
          character: ALL_CHARACTER_TYPES[Math.floor(Math.random() * ALL_CHARACTER_TYPES.length)],
          score: 0,
          inventory: { [randomFruit]: 10 },
        };
        return acc;
      }, {} as Record<PlayerId, Player>),
      npcs: generateNPCs(),
      background: generateBackground(),
      objects: generateObjects(),
    };
  },
  update: ({ game }) => {
    for (const player of Object.values(game.players)) {
      if (player.location.x === player.destination.x && player.location.y === player.destination.y) {
        continue;
      }

      if (player.location.x < player.destination.x) {
        player.location.x += 1;
      }
      if (player.location.x > player.destination.x) {
        player.location.x -= 1;
      }
      if (player.location.y < player.destination.y) {
        player.location.y += 1;
      }
      if (player.location.y > player.destination.y) {
        player.location.y -= 1;
      }
    }
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount;
    },
    setDestination: ({ playerId, destination }, { game }) => {
      game.players[playerId].destination = destination;
    },
  },
  updatesPerSecond: 8,
});

function locationForIndex(index: number) {
  if (index === 0) {
    return { x: Math.floor(MAP_WIDTH / 2) - 1, y: Math.floor(MAP_HEIGHT / 2) };
  }
  if (index === 1) {
    return { x: Math.floor(MAP_WIDTH / 2) + 1, y: Math.floor(MAP_HEIGHT / 2) };
  }
  if (index === 2) {
    return { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) - 1 };
  }

  return { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) + 1 };
}
