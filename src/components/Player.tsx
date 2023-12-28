import { useStore } from "../store";
import { Character } from "./Character";

export function Player() {
  const game = useStore((state) => state.game);
  const players = useStore((state) => state.players);
  const playerId = useStore((state) => state.yourPlayerId);

  if (!game) {
    return null;
  }

  const player = game.players.find((p) => p.playerId === playerId);

  if (!player) {
    return null;
  }

  const playerInfo = players?.[playerId];

  return <Character character={player.character} name={playerInfo?.displayName} />;
}
