import { Stage } from "@pixi/react"

import { EventLog } from "../../components/EventLog"
import { Spectatorbackground } from "../../components/SpectatorBackground"

export function Spectate() {
  return (
    <div>
      <Stage>
        <Spectatorbackground />
      </Stage>
      <EventLog />
    </div>
  )
}
