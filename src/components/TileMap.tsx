import { PixiComponent } from "@pixi/react";
import { CompositeTilemap } from "@pixi/tilemap";
import { DisplayObject } from "pixi.js";

type TileMapProps = {
  tiles: (number | undefined)[][];
  tileNames: string[];
  tileWidth?: number;
};

export const TileMap = PixiComponent<TileMapProps, DisplayObject>("TileMap", {
  create({ tiles, tileNames, tileWidth = 16 }) {
    const tilemap = new CompositeTilemap();
    drawTiles(tilemap, tiles, tileNames, tileWidth);

    return tilemap as any;
  },
  // @ts-ignore DisplayObject not assignable to CompositeTilemap
  applyProps(instance: CompositeTilemap, oldProps, newProps) {
    const { tiles, tileNames, tileWidth = 16 } = newProps;
    drawTiles(instance, tiles, tileNames, tileWidth);
  },
});

function drawTiles(tileMap: CompositeTilemap, tiles: (number | undefined)[][], tileNames: string[], tileWidth = 16) {
  tileMap.clear();
  for (let y = 0; y < tiles.length; y++) {
    for (let x = 0; x < tiles[y].length; x++) {
      const tile = tiles[y][x];
      if (tile === undefined) {
        continue;
      }
      tileMap.tile(tileNames[tile], x * tileWidth, y * tileWidth);
    }
  }
}
