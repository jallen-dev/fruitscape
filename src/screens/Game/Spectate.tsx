import { Background } from "@/components/Background/Background"
import { Character } from "@/components/Character"
import { EventLog } from "@/components/EventLog"
import { useGame } from "@/hooks/useGame"
import { usePlayerLocation } from "@/hooks/usePlayerLocation"
import { Container, Stage } from "@pixi/react"

export function Spectate() {
  return (
    <div>
      <Stage>
        <Game />
      </Stage>
      <EventLog />
    </div>
  )
}

function Game() {
  const { players } = useGame()
  const { x, y } = usePlayerLocation()

  return (
    <>
      <Container x={x} y={y}>
        <Background>
          {Object.values(players).map((player) => (
            <Character key={player.id} playerId={player.id} />
          ))}
        </Background>
      </Container>
    </>
  )
}
