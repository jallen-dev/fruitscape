import { Container, Sprite, useApp } from "@pixi/react"
import { Texture } from "@pixi/core"
import "@pixi/events"

import { Background } from "./Background"
import { useStore } from "../store"
import { Character } from "./Character"
import { LocationMarker } from "./LocationMarker"

export function ScrollingBackground() {
  const game = useStore((state) => state.game)
  const playerDetails = useStore((state) => state.playerDetails)
  const yourPlayerId = useStore((state) => state.yourPlayerId)

  const app = useApp()
  app.resizeTo = window
  const width = app.screen.width
  const height = app.screen.height

  const player = game.players[yourPlayerId]

  const HALF_TILE = 16
  const x = player ? -player.location.x * 32 + width / 2 - HALF_TILE : 0
  const y = player ? -player.location.y * 32 + height / 2 : 0

  const otherPlayers = Object.values(game.players).filter((player) => player.id !== yourPlayerId)

  return (
    <>
      <Container x={x} y={y}>
        <Background />
        {otherPlayers.map((player) => (
          <Character
            key={player.id}
            character={player.character}
            location={player.location}
            name={playerDetails[player.id].displayName}
          />
        ))}
        <LocationMarker />
      </Container>
      <Sprite
        texture={Texture.EMPTY}
        width={width}
        height={height}
        interactive={true}
        pointerdown={(event) => {
          if (!player) {
            return
          }

          const xTiles = Math.floor((event.screen.x - width / 2 + HALF_TILE) / 32)
          const yTiles = Math.floor((event.screen.y - height / 2) / 32)
          const nextCoords = [player.location.x + xTiles, player.location.y + yTiles]
          Rune.actions.setDestination({ playerId: yourPlayerId, destination: { x: nextCoords[0], y: nextCoords[1] } })
        }}
      />
    </>
  )
}
