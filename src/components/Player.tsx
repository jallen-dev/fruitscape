import { useStore } from "../store";
import { Character } from "./Character";

export function Player() {
  const game = useStore((state) => state.game);
  const playerId = useStore((state) => state.yourPlayerId);

  if (!game) {
    return null;
  }

  const player = game.players.find((p) => p.playerId === playerId);

  if (!player) {
    return null;
  }

  return <Character character={player.character} />;
}
