import { PixiComponent } from "@pixi/react";
import { CompositeTilemap } from "@pixi/tilemap";
import { DisplayObject } from "pixi.js";
import { TileMapData } from "../maps";

type TileMapProps = {
  layers: TileMapData[];
  tileNames: string[];
  tileWidth?: number;
};

export const TileMap = PixiComponent<TileMapProps, DisplayObject>("TileMap", {
  create({ layers, tileNames, tileWidth = 16 }) {
    const tilemap = new CompositeTilemap();
    drawLayers(tilemap, layers, tileNames, tileWidth);

    return tilemap as any;
  },
  // @ts-ignore DisplayObject not assignable to CompositeTilemap
  applyProps(instance: CompositeTilemap, oldProps, newProps) {
    const { layers, tileNames, tileWidth = 16 } = newProps;
    drawLayers(instance, layers, tileNames, tileWidth);
  },
});

function drawLayers(tileMap: CompositeTilemap, layers: TileMapData[], tileNames: string[], tileWidth = 16) {
  tileMap.clear();
  for (const layer of layers) {
    for (let y = 0; y < layer.length; y++) {
      for (let x = 0; x < layer[y].length; x++) {
        const tile = layer[y][x];
        if (tile === undefined) {
          continue;
        }
        tileMap.tile(tileNames[tile], x * tileWidth, y * tileWidth);
      }
    }
  }
}
