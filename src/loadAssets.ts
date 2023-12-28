import { Assets } from "@pixi/assets";
import { BaseTexture } from "@pixi/core";
import { Spritesheet } from "@pixi/spritesheet";
import { SCALE_MODES } from "@pixi/constants";

import data from "./assets/atlas.json";

export async function load() {
  Assets.add({
    alias: "atlas.png",
    src: "atlas.png",
    data: { scaleMode: SCALE_MODES.NEAREST },
  });
  await Assets.load("atlas.png");

  const sheet = new Spritesheet(BaseTexture.from("atlas.png"), data);
  return await sheet.parse();
}
