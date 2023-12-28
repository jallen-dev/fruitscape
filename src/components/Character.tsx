import { Sprite, useApp } from "@pixi/react";

export function Character() {
  const app = useApp();

  return (
    <Sprite
      image="https://pixijs.io/pixi-react/img/bunny.png"
      x={app.screen.width / 2}
      y={app.screen.height / 2}
      anchor={{ x: 0.5, y: 0.5 }}
    />
  );
}
