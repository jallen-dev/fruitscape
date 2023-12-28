import { Container } from "@pixi/react";

import { background, objects } from "../maps";

import { TileMap } from "./TileMap";
import { useStore } from "../store";

export function Background() {
  const tileNames = useStore((state) => state.tileNames);

  if (!tileNames.length) {
    return null;
  }

  return (
    <Container scale={2}>
      <TileMap layers={[background, objects]} tileNames={tileNames} />
    </Container>
  );
}
