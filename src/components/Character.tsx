import { Sprite, useApp } from "@pixi/react";
import { CharacterType } from "../characters";

export function Character({ character, location }: { character: CharacterType; location?: { x: number; y: number } }) {
  const app = useApp();

  return (
    <Sprite
      image={character}
      x={location?.x ?? app.screen.width / 2}
      y={location?.y ?? app.screen.height / 2}
      anchor={{ x: 0.5, y: 0.5 }}
      scale={2}
    />
  );
}
