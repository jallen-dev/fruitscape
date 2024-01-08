import { PixiComponent } from "@pixi/react"
// @ts-expect-error something about types idk
import { CompositeTilemap } from "@pixi/tilemap"
import { DisplayObject } from "pixi.js"

import { MAP_WIDTH } from "../constants"

type TileMapData = number[]

type TileMapProps = {
  layers: TileMapData[]
  tileNames: string[]
  tileWidth?: number
}

export const TileMap = PixiComponent<TileMapProps, DisplayObject>("TileMap", {
  create({ layers, tileNames, tileWidth = 16 }) {
    const tilemap = new CompositeTilemap()
    drawLayers(tilemap, layers, tileNames, tileWidth)

    return tilemap
  },
  applyProps(instance: CompositeTilemap, oldProps, newProps) {
    const { layers, tileNames, tileWidth = 16 } = newProps
    drawLayers(instance, layers, tileNames, tileWidth)
  },
})

function drawLayers(
  tileMap: CompositeTilemap,
  layers: TileMapData[],
  tileNames: string[],
  tileWidth = 16,
  mapWidth = MAP_WIDTH,
) {
  tileMap.clear()
  for (const layer of layers) {
    const mapHeight = layer.length / mapWidth
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const tile = layer[y * mapWidth + x]
        if (tile === 0) {
          continue
        }
        tileMap.tile(tileNames[tile], x * tileWidth, y * tileWidth)
      }
    }
  }
}
