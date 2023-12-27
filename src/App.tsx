import "./App.css";
import { Container, PixiRef, Sprite, Stage, useApp } from "@pixi/react";
import { Texture } from "@pixi/core";
import "@pixi/events";

import { Background } from "./components/Background";
import { useRef, useState } from "react";

function App() {
  return (
    <Stage>
      <ScrollingBackground />
      <Sprite image="https://pixijs.io/pixi-react/img/bunny.png" x={400} y={270} anchor={{ x: 0.5, y: 0.5 }} />
    </Stage>
  );
}

export default App;

type IContainer = PixiRef<typeof Container>;

function ScrollingBackground() {
  const containerRef = useRef<IContainer>(null);
  const [coords, setCoords] = useState([0, 0]);
  const app = useApp();
  const width = app.screen.width;
  const height = app.screen.height;

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
          console.log(event);
          const nextCoords = [x - (event.screen.x - width / 2), y - (event.screen.y - height / 2)];
          setCoords(nextCoords);
        }}
      />
    </>
  );
}
