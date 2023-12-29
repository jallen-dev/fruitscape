import { MAP_HEIGHT, MAP_WIDTH } from "./constants";
import { ALL_CHARACTER_TYPES } from "./models/Character";
import { ALL_FRUIT_TYPES } from "./models/Fruit";
import { Npc } from "./models/Npc";

export function generateNPCs() {
  const npcs: Record<string, Npc> = {};

  for (let i = 0; i < 10; i++) {
    const offeredFruit = ALL_FRUIT_TYPES[Math.floor(Math.random() * ALL_FRUIT_TYPES.length)];
    const desiredFruit = ALL_FRUIT_TYPES.filter((fruit) => fruit !== offeredFruit)[
      Math.floor(Math.random() * (ALL_FRUIT_TYPES.length - 1))
    ];

    npcs[i.toString()] = {
      id: i.toString(),
      character: ALL_CHARACTER_TYPES[Math.floor(Math.random() * ALL_CHARACTER_TYPES.length)],
      location: {
        x: Math.floor(Math.random() * MAP_WIDTH),
        y: Math.floor(Math.random() * MAP_HEIGHT),
      },
      offeredFruit,
      desiredFruit,
    };
  }

  return npcs;
}

export type TileMapData = (number | undefined)[][];

export function generateBackground(debug = false) {
  const background: TileMapData = Array.from({ length: MAP_HEIGHT }, () => Array.from({ length: MAP_WIDTH }, () => 0));

  // randomly add some grass
  for (let i = 0; i < 10; i++) {
    const x = Math.floor(Math.random() * background[0].length);
    const y = Math.floor(Math.random() * background.length);
    background[y][x] = 1;
  }

  // randomly add some flowers
  for (let i = 0; i < 10; i++) {
    const x = Math.floor(Math.random() * background[0].length);
    const y = Math.floor(Math.random() * background.length);
    background[y][x] = 2;
  }

  if (debug) {
    // place dirt in a checkerboard pattern (for testing)
    for (let y = 0; y < background.length; y++) {
      for (let x = 0; x < background[y].length; x++) {
        if ((x + y) % 2 === 0) {
          background[y][x] = 25;
        }
      }
    }
  }

  return background;
}

export function generateObjects() {
  const objects: TileMapData = Array.from({ length: MAP_HEIGHT }, () =>
    Array.from({ length: MAP_WIDTH }, () => undefined)
  );

  for (let i = 0; i < 10; i++) {
    const x = Math.floor(Math.random() * objects[0].length);
    const y = Math.floor(Math.random() * objects.length);
    objects[y][x] = 28;
  }

  return objects;
}
