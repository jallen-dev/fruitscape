import { CHARACTER_IMAGES } from "@/models/Character"
import { useStore } from "@/store"
import { Container, Sprite, Text, useApp } from "@pixi/react"
import { TextStyle } from "@pixi/text"

export function Character({ playerId }: { playerId: string }) {
  const app = useApp()
  const assetsLoaded = useStore((state) => state.assetsLoaded)
  const players = useStore((state) => state.game.players)
  const playerDetails = useStore((state) => state.playerDetails)

  const { character, location } = players[playerId]

  if (!assetsLoaded) {
    return null
  }

  const x = location ? location.x * 16 + 8 : app.screen.width / 2
  const y = location ? location.y * 16 : app.screen.height / 2
  return (
    <Container x={x} y={y}>
      <Text
        text={playerDetails[playerId].displayName ?? ""}
        anchor={{ x: 0.5, y: 0 }}
        y={-15}
        style={new TextStyle({ fontSize: 20 })}
        scale={0.5}
      />
      <Sprite image={CHARACTER_IMAGES[character]} anchor={{ x: 0.5, y: 0 }} />
    </Container>
  )
}
