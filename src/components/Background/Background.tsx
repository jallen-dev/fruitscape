import { background, npcs, objects, walkableObjects } from "@/assets/maps"
import { TileMap } from "@/components/TileMap"
import { useStore } from "@/store"
import { Container } from "@pixi/react"

export function Background() {
  const tileNames = useStore((state) => state.tileNames)

  if (!tileNames) {
    return null
  }

  return (
    <Container scale={2}>
      <TileMap layers={[background, walkableObjects, objects, npcs]} tileNames={tileNames} />
    </Container>
  )
}
