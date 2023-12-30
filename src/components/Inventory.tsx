import { FRUIT_IMAGES, FruitType } from "../models/Fruit"
import { useStore } from "../store"

const MAX_INVENTORY_SIZE = 8

export function Inventory() {
  const inventory = useStore((state) => state.game?.players[state.yourPlayerId].inventory) ?? {}
  const numItems = Object.values(inventory).length
  const emptySlots = Array.from({ length: MAX_INVENTORY_SIZE - numItems })

  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {Object.entries(inventory).map(([fruitType, quantity]) => (
        <div className="relative border border-zinc-800 rounded-lg">
          <img src={FRUIT_IMAGES[fruitType as FruitType]} alt={fruitType} key={fruitType} className="w-full h-full" />
          <div className="absolute -top-1 -right-1 text-white text-sm font-bold bg-zinc-700 rounded-sm px-0.5 leading-snug">
            {quantity}
          </div>
        </div>
      ))}
      {emptySlots.map((_, index) => (
        <div key={index} className="w-full border border-zinc-800 rounded-lg aspect-square" />
      ))}
    </div>
  )
}
