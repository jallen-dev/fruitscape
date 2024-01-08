import { Assets } from "@pixi/assets"
import { SCALE_MODES } from "@pixi/constants"
import { BaseTexture } from "@pixi/core"
import { Spritesheet } from "@pixi/spritesheet"

import data from "./assets/atlas.json"

export async function load() {
  Assets.add({
    alias: "atlas",
    src: "images/atlas.png",
    data: { scaleMode: SCALE_MODES.NEAREST },
  })
  await Assets.load("atlas")

  const sheet = new Spritesheet(BaseTexture.from("atlas"), data)
  return await sheet.parse()
}
