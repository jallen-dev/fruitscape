import { Sprite } from "@pixi/react";
import { useStore } from "../store";

export function LocationMarker({ location }: { location?: { x: number; y: number } }) {
  const game = useStore((state) => state.game);
  const loaded = useStore((state) => state.loaded);
  const playerId = useStore((state) => state.yourPlayerId);

  if (!loaded || !game) {
    return null;
  }

  const player = game.players.find((p) => p.playerId === playerId);

  if (!player) {
    return null;
  }

  if (player.location.x === player.destination.x && player.location.y === player.destination.y) {
    return null;
  }

  return (
    <Sprite
      image="set2/tile_0060.png"
      x={player.destination.x * 32}
      y={player.destination.y * 32}
      anchor={{ x: 0, y: 0 }}
      scale={2}
    />
  );
}
