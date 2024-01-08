import { AStarFinder } from "astar-typescript"
import { useEffect } from "react"
import { useStore } from "../store"
import { load } from "../loadAssets"
import { generateObstacleMap } from "../utils"

export function useInitClient() {
  useEffect(() => {
    // This is mainly to prevent loading assets twice in strict mode which makes Pixi log lots of warnings.
    if (useStore.getState().initialized) {
      return
    }

    Rune.initClient({
      onChange: ({ game, yourPlayerId, players }) => {
        if (game.gameId !== useStore.getState().gameId) {
          useStore.getState().reset(game.gameId)
        }
        useStore.setState({ game, yourPlayerId, playerDetails: players })
      },
    })

    const obstacleMap = generateObstacleMap()
    const aStarFinder = new AStarFinder({
      grid: { matrix: obstacleMap },
      // "allowPathAsCloseAsPossible" only works if the tile you click on is walkable. it doesn't work at all if you click on an obstacle.
      // worse, it's buggy in combination with the custom logic that finds nearest walkable tile.
      // allowPathAsCloseAsPossible: true,
      includeStartNode: false,
    })

    useStore.setState({ obstacleMap, aStarFinder, initialized: true })

    load().then((sheet) => {
      // 0 represents an empty tile so put "null" at the beginning of the list
      const tileNames = ["null", ...Object.keys(sheet)]
      useStore.setState({ tileNames, assetsLoaded: true })
    })
  }, [])
}
