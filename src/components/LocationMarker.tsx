import { Sprite } from "@pixi/react";
import { useStore } from "../store";

export function LocationMarker({ location }: { location?: { x: number; y: number } }) {
  const loaded = useStore((state) => state.loaded);
  const destination = useStore((state) => state.destination);

  if (!loaded || !destination) {
    return null;
  }

  return (
    <Sprite
      image="set2/tile_0060.png"
      x={destination.x * 32}
      y={destination.y * 32}
      anchor={{ x: 0, y: 0 }}
      scale={2}
    />
  );
}
