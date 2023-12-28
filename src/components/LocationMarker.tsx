import { Sprite } from "@pixi/react";
import { useStore } from "../store";

export function LocationMarker({ location }: { location?: { x: number; y: number } }) {
  const loaded = useStore((state) => state.loaded);

  if (!loaded) {
    return null;
  }

  const x = location ? location.x * 32 : 0;
  const y = location ? location.y * 32 : 0;

  return <Sprite image="set2/tile_0060.png" x={x} y={y} anchor={{ x: 0, y: 0 }} scale={2} />;
}
