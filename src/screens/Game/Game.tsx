import { PlayerBackground } from "@/components/Background/PlayerBackground"
import { EventLog } from "@/components/EventLog"
import { Player } from "@/components/Player"
import { Recipe } from "@/components/Recipe"
import { Trade } from "@/components/Trade"
import { Stage } from "@pixi/react"

export function Game() {
  return (
    <div>
      <Stage>
        <PlayerBackground />
        <Player />
      </Stage>
      <Trade />
      <Recipe />
      <EventLog />
    </div>
  )
}
