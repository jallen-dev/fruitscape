import { Container, PixiRef, Sprite, Stage, useApp } from "@pixi/react";
import { Texture } from "@pixi/core";
import "@pixi/events";

import { Background } from "./Background";
import { useRef, useState } from "react";
import { useStore } from "../store";
import { Character } from "./Character";
import { LocationMarker } from "./LocationMarker";

type IContainer = PixiRef<typeof Container>;

export function ScrollingBackground() {
  const containerRef = useRef<IContainer>(null);
  const game = useStore((state) => state.game);
  const players = useStore((state) => state.players);
  const yourPlayerId = useStore((state) => state.yourPlayerId);

  const app = useApp();
  app.resizeTo = window;
  const width = app.screen.width;
  const height = app.screen.height;

  const player = game?.players.find((p) => p.playerId === yourPlayerId);

  const HALF_HEIGHT_IN_TILES = Math.floor(height / 32 / 2);
  const HALF_WIDTH_IN_TILES = Math.floor(width / 32 / 2);
  const x = player ? player.location.x - HALF_WIDTH_IN_TILES : 0;
  const y = player ? player.location.y - HALF_HEIGHT_IN_TILES : 0;

  const otherPlayers = game?.players.filter((p) => p.playerId !== yourPlayerId) ?? [];

  return (
    <>
      {/* TODO: this -9 and +12 might be due to the screen width and height not being perfectly divisible. maybe check that out and make sure it looks centered no matter the screen dimensions */}
      <Container x={-x * 32 - 9} y={-y * 32 + 12}>
        <Background />
        {otherPlayers.map((player) => (
          <Character
            key={player.playerId}
            character={player.character}
            location={player.location}
            name={players?.[player.playerId].displayName}
          />
        ))}
        {game?.npcs.map((npc, index) => (
          <Character key={index} character={npc.character} location={npc.location} />
        ))}
        <LocationMarker location={player?.location} />
      </Container>
      <Sprite
        texture={Texture.EMPTY}
        width={width}
        height={height}
        interactive={true}
        pointerdown={(event) => {
          // TODO: +16 -9, -16 is probably due to screen not being perfectly divisible. See TODO above
          const xTiles = Math.floor((event.screen.x + 16 - 9) / 32);
          const yTiles = Math.floor((event.screen.y - 16) / 32);
          const nextCoords = [x + xTiles, y + yTiles];
          Rune.actions.setDestination({ playerId: yourPlayerId, destination: { x: nextCoords[0], y: nextCoords[1] } });
        }}
      />
    </>
  );
}
