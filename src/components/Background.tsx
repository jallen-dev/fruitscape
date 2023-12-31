import { Container } from "@pixi/react"

import { TileMap } from "./TileMap"
import { useStore } from "../store"

export function Background() {
  const tileNames = useStore((state) => state.tileNames)
  const background = useStore((state) => state.game?.background)
  const objects = useStore((state) => state.game?.objects)

  if (!tileNames || !background || !objects) {
    return null
  }

  return (
    <Container scale={2}>
      <TileMap layers={[background, objects]} tileNames={tileNames} />
    </Container>
  )
}
