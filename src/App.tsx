import { Music } from "@/components/Music.tsx"
import { useInitClient } from "@/hooks/useInitClient.ts"
import { usePlayerMovement } from "@/hooks/usePlayerMovement.ts"
import { SCREENS } from "@/models/Screen.ts"
import { useStore } from "@/store.ts"

import "./App.css"

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
