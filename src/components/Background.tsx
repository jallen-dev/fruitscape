import { CompositeTilemap, Tilemap } from "@pixi/tilemap";
import { Assets } from "@pixi/assets";
import { useEffect, useRef, useState } from "react";
import { Rectangle, Texture, BaseTexture } from "@pixi/core";
import { Spritesheet } from "@pixi/spritesheet";
import { Container, PixiComponent, PixiRef, _ReactPixi } from "@pixi/react";
import { Sprite } from "@pixi/sprite";
import data from "../atlas/background.json";
import { background } from "../maps";

type IContainer = PixiRef<typeof Container>;

export function Background() {
  const [tileNames, setTileNames] = useState<string[]>(null!);
  const containerRef = useRef<IContainer>(null);
  useEffect(() => {
    load().then((sheet) => {
      console.log(Object.keys(sheet));
      //   const tilemap = new CompositeTilemap();
      //   tilemap.tile("tile_0000.png", 0, 0);
      //   if (containerRef.current) {
      //     containerRef.current.addChild(tilemap);
      //   }
      setTileNames(Object.keys(sheet));
    });
  }, []);

  if (!tileNames) {
    return null;
  }

  //   return <Container ref={containerRef} />;

  return (
    <Container scale={2}>
      <TileMap tiles={background} tileNames={tileNames} />
    </Container>
  );
}

async function load() {
  Assets.add({ alias: "background.png", src: "assets/background.png" });
  await Assets.load("background.png");

  const sheet = new Spritesheet(BaseTexture.from("background.png"), data);
  return await sheet.parse();
}

const TileMap = PixiComponent("TileMap", {
  create({ tiles, tileNames, tileWidth = 16 }) {
    const tilemap = new CompositeTilemap();
    for (let y = 0; y < tiles.length; y++) {
      for (let x = 0; x < tiles[y].length; x++) {
        tilemap.tile(tileNames[tiles[y][x]], x * tileWidth, y * tileWidth);
      }
    }

    return tilemap;
  },
  applyProps(instance, oldProps, newProps) {
    const { tiles, tileNames, tileWidth = 16 } = newProps;

    instance.clear();
    for (let y = 0; y < tiles.length; y++) {
      for (let x = 0; x < tiles[y].length; x++) {
        instance.tile(tileNames[tiles[y][x]], x * tileWidth, y * tileWidth);
      }
    }
  },
});
