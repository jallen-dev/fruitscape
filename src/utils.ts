import { MAP_HEIGHT, MAP_WIDTH } from "./constants"
import { ALL_CHARACTER_TYPES } from "./models/Character"
import { FruitType } from "./models/Fruit"
import { Npc } from "./models/Npc"
import { npcs as npcsMap } from "./assets/maps"
import { objects } from "./assets/maps"
import { GameState } from "./logic/types"

export function generateNPCs() {
  const npcs: Record<string, Npc> = {}

  for (let i = 0; i < npcsMap.length; i++) {
    if (npcsMap[i] === 0) {
      continue
    }

    const y = Math.floor(i / MAP_WIDTH)
    const x = i % MAP_WIDTH

    npcs[i.toString()] = {
      id: i.toString(),
      character: ALL_CHARACTER_TYPES[Math.floor(Math.random() * ALL_CHARACTER_TYPES.length)],
      location: {
        x,
        y,
      },
      // placeholders
      offeredFruit: FruitType.Apple,
      desiredFruit: FruitType.Apricot,
    }
  }

  return npcs
}

export function setNpcsFruits(game: GameState) {
  const fruitsInPlay = game.fruits.slice(0, game.uniqueFruits)
  let i = 0
  for (const npc of Object.values(game.npcs)) {
    const offeredFruit = fruitsInPlay[i++ % fruitsInPlay.length]
    const desiredFruit = fruitsInPlay.filter((fruit) => fruit !== offeredFruit)[
      Math.floor(Math.random() * (fruitsInPlay.length - 1))
    ]

    npc.offeredFruit = offeredFruit
    npc.desiredFruit = desiredFruit
  }
}

export function generateRecipe(fruits: FruitType[], totalFruits: number) {
  const recipe = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1
    return acc
  }, {} as Partial<Record<FruitType, number>>)
  const remainingFruits = totalFruits - fruits.length
  for (let i = 0; i < remainingFruits; i++) {
    const fruit = fruits[Math.floor(Math.random() * fruits.length)]
    recipe[fruit]! += 1
  }

  return recipe
}

export function shuffle<T>(array: T[]) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export function generateObstacleMap() {
  const map = []
  for (let y = 0; y < MAP_HEIGHT; y++) {
    const row = []
    for (let x = 0; x < MAP_WIDTH; x++) {
      const tile = objects[y * MAP_WIDTH + x]
      row.push(tile === 0 ? 0 : 1)
    }
    map.push(row)
  }

  return map
}
