import { Container, Sprite, Text, useApp } from "@pixi/react"
import { TextStyle } from "@pixi/text"

import { CHARACTER_IMAGES, CharacterType } from "../models/Character"
import { useStore } from "../store"

type CharacterProps = {
  character: CharacterType
  location?: { x: number; y: number }
  name?: string
}

export function Character({ character, location, name }: CharacterProps) {
  const app = useApp()
  const assetsLoaded = useStore((state) => state.assetsLoaded)

  if (!assetsLoaded) {
    return null
  }

  const x = location ? location.x * 32 + 16 : app.screen.width / 2
  const y = location ? location.y * 32 : app.screen.height / 2
  return (
    <Container x={x} y={y}>
      <Text text={name ?? ""} anchor={{ x: 0.5, y: 0 }} y={-30} style={new TextStyle({ fontSize: 18 })} />
      <Sprite image={CHARACTER_IMAGES[character]} scale={2} anchor={{ x: 0.5, y: 0 }} />
    </Container>
  )
}
