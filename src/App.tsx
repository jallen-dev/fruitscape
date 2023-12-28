import { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./logic/logic.ts";
import { Stage } from "@pixi/react";
import { ScrollingBackground } from "./components/ScrollingBackground.tsx";
import { Character } from "./components/Character.tsx";
import { load } from "./loadAssets.ts";
import { useStore } from "./store.ts";

function App() {
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
      useStore.getState().setTileNames(Object.keys(sheet));
      useStore.getState().setLoaded(true);
    });
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }

  const player = game.players.find((p) => p.playerId === playerId);

  return (
    <Stage>
      <ScrollingBackground />
      {player && <Character character={player.character} />}
    </Stage>
  );
}

export default App;
