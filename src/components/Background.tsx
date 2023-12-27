import { Assets } from "@pixi/assets";
import { useEffect, useState } from "react";
import { BaseTexture } from "@pixi/core";
import { Spritesheet } from "@pixi/spritesheet";
import { Container } from "@pixi/react";
import data from "../atlas/background.json";
import { background, objects } from "../maps";

import { SCALE_MODES } from "@pixi/constants";
import { TileMap } from "./TileMap";

export function Background() {
  const [tileNames, setTileNames] = useState<string[]>(null!);
  useEffect(() => {
    load().then((sheet) => {
      setTileNames(Object.keys(sheet));
    });
  }, []);

  if (!tileNames) {
    return null;
  }

  return (
    <Container scale={2}>
      <TileMap tiles={background} tileNames={tileNames} />
      <TileMap tiles={objects} tileNames={tileNames} />
    </Container>
  );
}

async function load() {
  Assets.add({ alias: "background.png", src: "assets/background.png", data: { scaleMode: SCALE_MODES.NEAREST } });
  await Assets.load("background.png");

  const sheet = new Spritesheet(BaseTexture.from("background.png"), data);
  return await sheet.parse();
}
