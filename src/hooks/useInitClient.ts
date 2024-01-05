import { AStarFinder } from "astar-typescript"
import { useEffect } from "react"
import { useStore } from "../store"
import { load } from "../loadAssets"
import { generateObstacleMap } from "../utils"

export function useInitClient() {
  const setGame = useStore((state) => state.setGame)
  const setObstacleMap = useStore((state) => state.setObstacleMap)
  const setAStarFinder = useStore((state) => state.setAStarFinder)
  const setPlayerDetails = useStore((state) => state.setPlayerDetails)
  const setYourPlayerId = useStore((state) => state.setYourPlayerId)

  useEffect(() => {
    if (useStore.getState().initialized) {
      return
    }
    Rune.initClient({
      onChange: ({ game, yourPlayerId, players }) => {
        setGame(game)
        setPlayerDetails(players)
        setYourPlayerId(yourPlayerId ?? "")
      },
    })

    const obstacleMap = generateObstacleMap()
    setObstacleMap(obstacleMap)
    setAStarFinder(
      // TODO: find a better astar implementation
      new AStarFinder({
        grid: { matrix: obstacleMap },
        // "allowPathAsCloseAsPossible" only works if the tile you click on is walkable. it doesn't work at all if you click on an obstacle.
        // worse, it's buggy in combination with the custom logic that finds nearest walkable tile.
        // allowPathAsCloseAsPossible: true,
        includeStartNode: false,
      })
    )

    load().then((sheet) => {
      // 0 represents an empty tile so put "null" at the beginning of the list
      useStore.getState().setTileNames(["null", ...Object.keys(sheet)])
      useStore.getState().setAssetsLoaded(true)
    })
    useStore.getState().setInitialized(true)
  }, [])
}
