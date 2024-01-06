import "./App.css"
import { useStore } from "./store.ts"
import { HowToPlay } from "./screens/HowToPlay/HowToPlay.tsx"
import { usePlayerMovement } from "./hooks/usePlayerMovement.ts"
import { useInitClient } from "./hooks/useInitClient.ts"
import { Music } from "./components/Music.tsx"
import { CharacterSelect } from "./screens/CharacterSelect/CharacterSelect.tsx"
import { Game } from "./screens/Game/Game.tsx"
import { Screen } from "./types.ts"

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

const SCREENS: { [S in Screen]: () => React.JSX.Element | null } = {
  characterSelect: CharacterSelect,
  game: Game,
  howToPlay: HowToPlay,
} as const
