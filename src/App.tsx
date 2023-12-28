import { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./logic/logic.ts";
import { Stage } from "@pixi/react";
import { ScrollingBackground } from "./components/ScrollingBackground.tsx";
import { Character } from "./components/Character.tsx";
import { load } from "./loadAssets.ts";
import { useStore } from "./store.ts";

function App() {
  const setTileNames = useStore((state) => state.setTileNames);
  const game = useStore((state) => state.game);
  const playerId = useStore((state) => state.yourPlayerId);
  const setGame = useStore((state) => state.setGame);
  const setYourPlayerId = useStore((state) => state.setYourPlayerId);

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId }) => {
        console.log({ game });
        setGame(game);
        setYourPlayerId(yourPlayerId ?? "");
      },
    });

    load().then((sheet) => {
      setTileNames(Object.keys(sheet));
    });
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }

  const player = game.players.find((p) => p.playerId === playerId);

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <Stage>
      <ScrollingBackground />
      <Character character={player.character} />
    </Stage>
  );
}

export default App;
