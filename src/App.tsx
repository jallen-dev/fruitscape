import { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./logic.ts";
import { Stage } from "@pixi/react";
import { ScrollingBackground } from "./components/ScrollingBackground.tsx";
import { Character } from "./components/Character.tsx";
import { load } from "./loadAssets.ts";
import { useStore } from "./store.ts";

function App() {
  const [game, setGame] = useState<GameState>();
  const setTileNames = useStore((state) => state.setTileNames);
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game }) => {
        setGame(game);
      },
    });

    load().then((sheet) => {
      setTileNames(Object.keys(sheet));
    });
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <Stage>
      <ScrollingBackground />
      <Character />
    </Stage>
  );
}

export default App;
