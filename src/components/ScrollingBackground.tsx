import { Container, Sprite, useApp } from "@pixi/react"
import { Texture } from "@pixi/core"
import "@pixi/events"

import { Background } from "./Background"
import { useStore } from "../store"
import { Character } from "./Character"
import { LocationMarker } from "./LocationMarker"
import { BOTTOM_BOUNDS, LEFT_BOUNDS, MAP_HEIGHT, MAP_WIDTH, RIGHT_BOUNDS, TOP_BOUNDS } from "../constants"

export function ScrollingBackground() {
  const playerDetails = useStore((state) => state.playerDetails)
  const yourPlayerId = useStore((state) => state.yourPlayerId)
  const players = useStore((state) => state.game.players)
  const obstacleMap = useStore((state) => state.obstacleMap)

  const app = useApp()
  app.resizeTo = window
  const width = app.screen.width
  const height = app.screen.height

  const player = players[yourPlayerId]
  const otherPlayers = Object.values(players).filter((player) => player.id !== yourPlayerId)

  const HALF_TILE = 16
  const x = player ? -player.location.x * 32 + width / 2 - HALF_TILE : 0
  const y = player ? -player.location.y * 32 + height / 2 : 0

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
        <LocationMarker location={player.location} destination={player.destination} />
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
          // TODO: the logic would be as simple as this with a better astar implementation
          // const nextCoords = [player.location.x + xTiles, player.location.y + yTiles]
          const nextCoords = [
            Math.min(RIGHT_BOUNDS, Math.max(LEFT_BOUNDS, player.location.x + xTiles)),
            Math.min(BOTTOM_BOUNDS, Math.max(TOP_BOUNDS, player.location.y + yTiles)),
          ]
          if (obstacleMap[nextCoords[1]][nextCoords[0]]) {
            // tile is an obstacle. Perform a BFS to find the nearest non-obstacle tile
            const queue = [nextCoords]
            const visited = new Set<string>()
            while (queue.length > 0) {
              const [x, y] = queue.shift()!
              if (visited.has(`${x},${y}`)) {
                continue
              }
              if (obstacleMap[y][x]) {
                visited.add(`${x},${y}`)

                if (x + 1 < MAP_WIDTH) {
                  queue.push([x + 1, y])
                }
                if (x - 1 >= 0) {
                  queue.push([x - 1, y])
                }
                if (y + 1 < MAP_HEIGHT) {
                  queue.push([x, y + 1])
                }
                if (y - 1 >= 0) {
                  queue.push([x, y - 1])
                }
              } else {
                nextCoords[0] = x
                nextCoords[1] = y
                break
              }
            }
          }

          const [x, y] = nextCoords
          const path = useStore.getState().aStarFinder.findPath(player.location, { x, y }) as Array<[number, number]>

          Rune.actions.setDestination({ playerId: yourPlayerId, path })
        }}
      />
    </>
  )
}
