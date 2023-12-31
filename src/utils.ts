import { MAP_HEIGHT, MAP_WIDTH } from "./constants"
import { ALL_CHARACTER_TYPES } from "./models/Character"
import { ALL_FRUIT_TYPES, FruitType } from "./models/Fruit"
import { Npc } from "./models/Npc"

export function generateFruit(numFruit = 10) {
  // shuffle all fruits
  const shuffledFruits = ALL_FRUIT_TYPES.sort(() => 0.5 - Math.random())
  return shuffledFruits.slice(0, numFruit)
}

export function generateNPCs(fruits: FruitType[]) {
  const npcs: Record<string, Npc> = {}

  for (let i = 0; i < 10; i++) {
    const offeredFruit = fruits[Math.floor(Math.random() * fruits.length)]
    const desiredFruit = fruits.filter((fruit) => fruit !== offeredFruit)[
      Math.floor(Math.random() * (fruits.length - 1))
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
