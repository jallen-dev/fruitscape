export const MAP_WIDTH = 30;
export const MAP_HEIGHT = 50;

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
  const objects: TileMapData = Array.from({ length: MAP_HEIGHT }, () => Array.from({ length: MAP_WIDTH }, () => undefined));

  for (let i = 0; i < 10; i++) {
    const x = Math.floor(Math.random() * objects[0].length);
    const y = Math.floor(Math.random() * objects.length);
    objects[y][x] = 216;
  }

  return objects;
}
