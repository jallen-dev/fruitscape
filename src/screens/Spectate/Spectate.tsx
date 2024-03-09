import { Spectatorbackground } from "@/components/Background/SpectatorBackground"
import { EventLog } from "@/components/EventLog"
import { Stage } from "@pixi/react"

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
