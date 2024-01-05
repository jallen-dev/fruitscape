import "./App.css"
import { Stage } from "@pixi/react"
import { ScrollingBackground } from "./components/ScrollingBackground.tsx"
import { useStore } from "./store.ts"
import { Player } from "./components/Player.tsx"
import { Trade } from "./components/Trade.tsx"
import { Recipe } from "./components/Recipe.tsx"
import { EventLog } from "./components/EventLog.tsx"
import { HowToPlay } from "./components/HowToPlay/HowToPlay.tsx"
import { usePlayerMovement } from "./hooks/usePlayerMovement.ts"
import { useInitClient } from "./hooks/useInitClient.ts"
import { Music } from "./components/Music.tsx"

function App() {
  const playerId = useStore((state) => state.yourPlayerId)
  useInitClient()
  usePlayerMovement(playerId)

  return (
    <div>
      <Stage>
        <ScrollingBackground />
        <Player />
      </Stage>
      <Trade />
      <Recipe />
      <EventLog />
      <HowToPlay />
      <Music />
    </div>
  )
}

export default App
