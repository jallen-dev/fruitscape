import { CharacterType } from "../characters";

export type Player = {
  playerId: string;
  location: { x: number; y: number };
  character: CharacterType;
  score: number;
};
