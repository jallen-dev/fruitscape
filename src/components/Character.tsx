import { Container, Sprite, Text, useApp } from "@pixi/react";
import { TextStyle } from "@pixi/text";
import { CHARACTER_IMAGES, CharacterType } from "../models/Character";
import { useStore } from "../store";

export function Character({
  character,
  location,
  name,
}: {
  character: CharacterType;
  location?: { x: number; y: number };
  name?: string;
}) {
  const app = useApp();
  const loaded = useStore((state) => state.loaded);

  if (!loaded) {
    return null;
  }

  // TODO: fix this -16
  const x = location ? location.x * 32 + 16 : app.screen.width / 2;
  const y = location ? location.y * 32 : app.screen.height / 2;
  return (
    <Container x={x} y={y}>
      <Text text={name ?? ""} anchor={{ x: 0.5, y: 0 }} y={-30} style={new TextStyle({ fontSize: 18 })} />
      <Sprite image={CHARACTER_IMAGES[character]} scale={2} anchor={{ x: 0.5, y: 0 }} />
    </Container>
  );
}
