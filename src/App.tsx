import "./App.css";
import { Container, Sprite, Stage, useApp } from "@pixi/react";

import { Background } from "./components/Background";

function App() {
  return (
    <Stage>
      <ScrollingBackground />
      <Sprite image="https://pixijs.io/pixi-react/img/bunny.png" x={400} y={270} anchor={{ x: 0.5, y: 0.5 }} />
    </Stage>
  );
}

export default App;

function ScrollingBackground() {
  const app = useApp();
  const width = app.screen.width;
  const height = app.screen.height;
  return (
    <Container
      x={-50}
      pointerdown={(event) => {
        console.log(event);
      }}
    >
      <Background />
      {/* <Sprite texture={Texture.WHITE} width={500} height={500} /> */}
    </Container>
  );
}
