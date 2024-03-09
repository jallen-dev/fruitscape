import { Background } from "@/components/Background/Background"
import { Character } from "@/components/Character"
import { Controls } from "@/components/Controls"
import { EventLog } from "@/components/EventLog"
import { LocationMarker } from "@/components/LocationMarker"
import { Recipe } from "@/components/Recipe"
import { Trade } from "@/components/Trade"
import { useGame } from "@/hooks/useGame"
import { usePlayerLocation } from "@/hooks/usePlayerLocation"
import { Container, Stage } from "@pixi/react"

export function Play() {
  return (
    <div>
      <Stage>
        <Game />
      </Stage>
      <Trade />
      <Recipe />
      <EventLog />
    </div>
  )
}

function Game() {
  const { yourPlayerId, players } = useGame()
  const { x, y } = usePlayerLocation(yourPlayerId)

  return (
    <>
      <Container x={x} y={y}>
        <Background>
          {Object.values(players).map((player) => (
            <Character key={player.id} playerId={player.id} />
          ))}
          <LocationMarker />
        </Background>
      </Container>
      <Controls />
    </>
  )
}
