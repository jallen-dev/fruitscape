import { Stage } from "@pixi/react"

import { EventLog } from "../../components/EventLog"
import { Player } from "../../components/Player"
import { Recipe } from "../../components/Recipe"
import { ScrollingBackground } from "../../components/ScrollingBackground"
import { Trade } from "../../components/Trade"

export function Game() {
  return (
    <div>
      <Stage>
        <ScrollingBackground />
        <Player />
      </Stage>
      <Trade />
      <Recipe />
      <EventLog />
    </div>
  )
}
