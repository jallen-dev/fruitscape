import "./App.css"
import { useStore } from "./store.ts"
import { usePlayerMovement } from "./hooks/usePlayerMovement.ts"
import { useInitClient } from "./hooks/useInitClient.ts"
import { Music } from "./components/Music.tsx"
import { SCREENS } from "./models/Screen.ts"

function App() {
  const playerId = useStore((state) => state.yourPlayerId)
  const assetsLoaded = useStore((state) => state.assetsLoaded)
  const screen = useStore((state) => state.screen)
  useInitClient()
  usePlayerMovement(playerId)

  if (!assetsLoaded) {
    return null
  }

  const GameScreen = SCREENS[screen]

  return (
    <>
      <GameScreen />
      <Music />
    </>
  )
}

export default App
