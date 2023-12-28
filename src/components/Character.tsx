import { Sprite, useApp } from "@pixi/react";
import { CharacterType } from "../characters";
import { useStore } from "../store";

export function Character({ character, location }: { character: CharacterType; location?: { x: number; y: number } }) {
  const app = useApp();
  const loaded = useStore((state) => state.loaded);

  if (!loaded) {
    return null;
  }

  const x = location ? location.x * 32 + 16 : app.screen.width / 2;
  const y = location ? location.y * 32 + 16 : app.screen.height / 2;
  return <Sprite image={character} x={x} y={y} anchor={{ x: 0.5, y: 0.5 }} scale={2} />;
}
