import { Sprite, useApp } from "@pixi/react"
import { useStore } from "../../store"
import { CHARACTER_IMAGES } from "../../models/Character"

export function PlayerCharactersDisplay({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const players = useStore((state) => state.game.players)
  console.log({ players })
  const app = useApp()
  app.resizeTo = containerRef.current!

  const numPlayers = Object.keys(players).length
  const margin = (app.screen.width - numPlayers * 64) / (2 * numPlayers)

  return (
    <>
      {Object.entries(players).map(([playerId, player], index) => (
        <Sprite
          x={index * (64 + margin * 2) + margin}
          y={0}
          image={CHARACTER_IMAGES[player.character]}
          scale={4}
          eventMode="static"
          key={playerId}
        />
      ))}
    </>
  )
}
