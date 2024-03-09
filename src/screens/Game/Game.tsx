import { Stage } from "@pixi/react"

import { EventLog } from "../../components/EventLog"
import { Player } from "../../components/Player"
import { PlayerBackground } from "../../components/PlayerBackground"
import { Recipe } from "../../components/Recipe"
import { Trade } from "../../components/Trade"

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
