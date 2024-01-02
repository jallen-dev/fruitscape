import { useEffect } from "react"
import "./App.css"
import { Stage } from "@pixi/react"
import { ScrollingBackground } from "./components/ScrollingBackground.tsx"
import { load } from "./loadAssets.ts"
import { useStore } from "./store.ts"
import { Player } from "./components/Player.tsx"
import { Trade } from "./components/Trade.tsx"
import { MAP_HEIGHT, MAP_WIDTH } from "./constants.ts"
import { Recipe } from "./components/Recipe.tsx"
import { EventLog } from "./components/EventLog.tsx"

function App() {
  const playerId = useStore((state) => state.yourPlayerId)
  const setGame = useStore((state) => state.setGame)
  const setPlayers = useStore((state) => state.setPlayers)
  const setYourPlayerId = useStore((state) => state.setYourPlayerId)

  useEffect(() => {
    if (useStore.getState().initialized) {
      return
    }
    Rune.initClient({
      onChange: ({ game, yourPlayerId, players }) => {
        setGame(game)
        setPlayers(players)
        setYourPlayerId(yourPlayerId ?? "")
      },
    })

    load().then((sheet) => {
      // 0 represents an empty tile so put "null" at the beginning of the list
      useStore.getState().setTileNames(["null", ...Object.keys(sheet)])
      useStore.getState().setAssetsLoaded(true)
    })
    useStore.getState().setInitialized(true)
  }, [])

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (state) => state.game.players[playerId],
      (player) => {
        if (player && player.location.x === player.destination.x && player.location.y === player.destination.y) {
          // player has reached their destination.

          // check if they are standing on the chest
          if (player.location.x === Math.floor(MAP_WIDTH / 2) && player.location.y === Math.floor(MAP_HEIGHT / 2)) {
            useStore.getState().setRecipeOpen(true)
          }

          // check if there's an NPC there
          for (const npc of Object.values(useStore.getState().game.npcs)) {
            if (npc.location.x === player.location.x && npc.location.y === player.location.y) {
              useStore.getState().setTradeOpen(true)
              useStore.getState().setTradePartner(npc.id)
              return
            }
          }
        }
      }
    )

    return unsubscribe
  }, [playerId])

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

export default App
