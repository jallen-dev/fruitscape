import { Character } from "@/components/Character"
import { MAP_HEIGHT, MAP_WIDTH } from "@/constants"
import { useStore } from "@/store"
import { Container, useApp } from "@pixi/react"

import { Background } from "./Background"

export function Spectatorbackground() {
  const players = useStore((state) => state.game.players)
  const playerDetails = useStore((state) => state.playerDetails)

  const app = useApp()
  app.resizeTo = window
  const width = app.screen.width
  const height = app.screen.height

  const HALF_TILE = 16
  const x = -Math.floor(MAP_WIDTH / 2) * 32 + width / 2 - HALF_TILE
  const y = -Math.floor(MAP_HEIGHT / 2) * 32 + height / 2

  return (
    <Container x={x} y={y}>
      <Background />
      {Object.values(players).map((player) => (
        <Character
          key={player.id}
          character={player.character}
          location={player.location}
          name={playerDetails[player.id].displayName}
        />
      ))}
    </Container>
  )
}
