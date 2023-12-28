import { useEffect } from "react";
import "./App.css";
import { Stage } from "@pixi/react";
import { ScrollingBackground } from "./components/ScrollingBackground.tsx";
import { load } from "./loadAssets.ts";
import { useStore } from "./store.ts";
import { Player } from "./components/Player.tsx";

function App() {
  const game = useStore((state) => state.game);
  const playerId = useStore((state) => state.yourPlayerId);
  const setGame = useStore((state) => state.setGame);
  const setPlayers = useStore((state) => state.setPlayers);
  const setYourPlayerId = useStore((state) => state.setYourPlayerId);

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId, players }) => {
        setGame(game);
        setPlayers(players);
        setYourPlayerId(yourPlayerId ?? "");
      },
    });

    load().then((sheet) => {
      useStore.getState().setTileNames(Object.keys(sheet));
      useStore.getState().setLoaded(true);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (state) => state.game?.players[playerId],
      (player) => {
        if (player && player.location.x === player.destination.x && player.location.y === player.destination.y) {
          console.log("Player arrived at destination");
          // TODO: check if player is on a npc
        }
      }
    );

    return unsubscribe;
  }, [playerId]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <Stage>
      <ScrollingBackground />
      <Player />
    </Stage>
  );
}

export default App;
