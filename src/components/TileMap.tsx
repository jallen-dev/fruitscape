import { PixiComponent } from "@pixi/react";
import { CompositeTilemap } from "@pixi/tilemap";
import { DisplayObject } from "pixi.js";

type TileMapProps = {
  tiles: number[][];
  tileNames: string[];
  tileWidth?: number;
};

export const TileMap = PixiComponent<TileMapProps, DisplayObject>("TileMap", {
  create({ tiles, tileNames, tileWidth = 16 }) {
    const tilemap = new CompositeTilemap();
    for (let y = 0; y < tiles.length; y++) {
      for (let x = 0; x < tiles[y].length; x++) {
        tilemap.tile(tileNames[tiles[y][x]], x * tileWidth, y * tileWidth);
      }
    }

    tilemap.tile(tileNames[94], 10, 20);

    return tilemap as any;
  },
  // @ts-ignore DisplayObject not assignable to CompositeTilemap
  applyProps(instance: CompositeTilemap, oldProps, newProps) {
    const { tiles, tileNames, tileWidth = 16 } = newProps;

    instance.clear();
    for (let y = 0; y < tiles.length; y++) {
      for (let x = 0; x < tiles[y].length; x++) {
        instance.tile(tileNames[tiles[y][x]], x * tileWidth, y * tileWidth);
      }
    }

    instance.tile(tileNames[94], 20 * tileWidth, 10 * tileWidth);
  },
});
