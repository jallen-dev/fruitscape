import { Sprite, useApp } from "@pixi/react";
import { ALL_CHARACTERS } from "../characters";

export function Character() {
  const app = useApp();

  const character = ALL_CHARACTERS[Math.floor(Math.random() * ALL_CHARACTERS.length)];

  return (
    <Sprite
      image={character}
      x={app.screen.width / 2}
      y={app.screen.height / 2}
      anchor={{ x: 0.5, y: 0.5 }}
      scale={2}
    />
  );
}
