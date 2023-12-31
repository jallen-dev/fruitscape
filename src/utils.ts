import { MAP_HEIGHT, MAP_WIDTH } from "./constants"
import { ALL_CHARACTER_TYPES } from "./models/Character"
import { ALL_FRUIT_TYPES } from "./models/Fruit"
import { Npc } from "./models/Npc"

export function generateNPCs() {
  const npcs: Record<string, Npc> = {}

  for (let i = 0; i < 10; i++) {
    const offeredFruit = ALL_FRUIT_TYPES[Math.floor(Math.random() * ALL_FRUIT_TYPES.length)]
    const desiredFruit = ALL_FRUIT_TYPES.filter((fruit) => fruit !== offeredFruit)[
      Math.floor(Math.random() * (ALL_FRUIT_TYPES.length - 1))
    ]

    npcs[i.toString()] = {
      id: i.toString(),
      character: ALL_CHARACTER_TYPES[Math.floor(Math.random() * ALL_CHARACTER_TYPES.length)],
      location: {
        x: Math.floor(Math.random() * MAP_WIDTH),
        y: Math.floor(Math.random() * MAP_HEIGHT),
      },
      offeredFruit,
      desiredFruit,
    }
  }

  return npcs
}
