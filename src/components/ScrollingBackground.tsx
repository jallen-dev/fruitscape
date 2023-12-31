import { Container, PixiRef, Sprite, Stage, useApp } from "@pixi/react"
import { Texture } from "@pixi/core"
import "@pixi/events"

import { Background } from "./Background"
import { useRef, useState } from "react"
import { useStore } from "../store"
import { Character } from "./Character"
import { LocationMarker } from "./LocationMarker"

type IContainer = PixiRef<typeof Container>

export function ScrollingBackground() {
  const containerRef = useRef<IContainer>(null)
  const game = useStore((state) => state.game)
  const players = useStore((state) => state.players)
  const yourPlayerId = useStore((state) => state.yourPlayerId)

  const app = useApp()
  app.resizeTo = window
  const width = app.screen.width
  const height = app.screen.height

  const player = game?.players[yourPlayerId]

  const HALF_TILE = 16
  const x = player ? -player.location.x * 32 + width / 2 - HALF_TILE : 0
  const y = player ? -player.location.y * 32 + height / 2 : 0

  const otherPlayers = Object.values(game?.players ?? {}).filter((player) => player.playerId !== yourPlayerId)

  return (
    <>
      <Container x={x} y={y}>
        <Background />
        {otherPlayers.map((player) => (
          <Character
            key={player.playerId}
            character={player.character}
            location={player.location}
            name={players?.[player.playerId].displayName}
          />
        ))}
        {Object.values(game?.npcs ?? {}).map((npc, index) => (
          <Character key={index} character={npc.character} location={npc.location} />
        ))}
        <LocationMarker location={player?.location} />
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
