import { Container } from "@pixi/react"

import { TileMap } from "./TileMap"
import { useStore } from "../store"
import { background, objects, npcs } from "../assets/maps"

export function Background() {
  const tileNames = useStore((state) => state.tileNames)

  if (!tileNames) {
    return null
  }

  return (
    <Container scale={2}>
      <TileMap layers={[background, objects, npcs]} tileNames={tileNames} />
    </Container>
  )
}
