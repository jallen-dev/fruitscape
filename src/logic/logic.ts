import type { RuneClient } from "rune-games-sdk/multiplayer";
import { ALL_CHARACTERS } from "../characters";
import { Player } from "./Player";
import { MAP_HEIGHT, MAP_WIDTH, NPC, TileMapData, generateBackground, generateNPCs, generateObjects } from "../maps";

export interface GameState {
  count: number;
  players: Player[];
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
      players: allPlayerIds.map((playerId, index) => ({
        playerId,
        location: locationForIndex(index),
        destination: locationForIndex(index),
        character: ALL_CHARACTERS[Math.floor(Math.random() * ALL_CHARACTERS.length)],
        score: 0,
      })),
      npcs: generateNPCs(),
      background: generateBackground(),
      objects: generateObjects(),
    };
  },
  update: ({ game }) => {
    game.players.forEach((player) => {
      if (player.location.x === player.destination.x && player.location.y === player.destination.y) {
        return;
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
    });
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount;
    },
    setDestination: ({ playerId, destination }, { game }) => {
      game.players.find((player) => player.playerId === playerId)!.destination = destination;
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
