import { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./logic/logic.ts";
import { Stage } from "@pixi/react";
import { ScrollingBackground } from "./components/ScrollingBackground.tsx";
import { Character } from "./components/Character.tsx";
import { load } from "./loadAssets.ts";
import { useStore } from "./store.ts";

function App() {
  const [game, setGame] = useState<GameState>();
  const [playerId, setPlayerId] = useState<string>();
  const setTileNames = useStore((state) => state.setTileNames);
  const setPlayers = useStore((state) => state.setPlayers);
  console.log({ game });

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId }) => {
        setGame(game);
        setPlayers(game.players);
        setPlayerId(yourPlayerId);
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
