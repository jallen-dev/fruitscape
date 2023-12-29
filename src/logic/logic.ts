import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer";
import { ALL_CHARACTERS } from "../characters";
import { Player } from "./Player";
import { MAP_HEIGHT, MAP_WIDTH, NPC, TileMapData, generateBackground, generateNPCs, generateObjects } from "../maps";
import { ALL_FRUIT_TYPES } from "../models/Fruit";

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
          character: ALL_CHARACTERS[Math.floor(Math.random() * ALL_CHARACTERS.length)],
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
