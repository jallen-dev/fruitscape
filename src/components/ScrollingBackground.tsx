import { Container, PixiRef, Sprite, Stage, useApp } from "@pixi/react";
import { Texture } from "@pixi/core";
import "@pixi/events";

import { Background } from "./Background";
import { useRef, useState } from "react";

type IContainer = PixiRef<typeof Container>;

export function ScrollingBackground() {
  const containerRef = useRef<IContainer>(null);
  const [coords, setCoords] = useState([0, 0]);
  const app = useApp();
  app.resizeTo = window;
  const width = app.screen.width;
  const height = app.screen.height;

  console.log({ width, height });

  const [x, y] = coords;
  return (
    <>
      <Container x={x} y={y}>
        <Background />
      </Container>
      <Sprite
        texture={Texture.EMPTY}
        width={width}
        height={height}
        interactive={true}
        pointerdown={(event) => {
          console.log(event.screen);
          const nextCoords = [
            x - (event.screen.x - width / 2),
            y - (event.screen.y - height / 2),
          ];
          console.log({ nextCoords });
          //   const nextCoords = [x - 10, y - 10];
          setCoords(nextCoords);
        }}
      />
    </>
  );
}
