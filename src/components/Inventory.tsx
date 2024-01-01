import { FruitType } from "../models/Fruit"
import { useStore } from "../store"
import { FruitQuantity } from "./FruitQuantity"

const MAX_INVENTORY_SIZE = 8

export function Inventory() {
  const inventory = useStore((state) => state.game?.players[state.yourPlayerId].inventory) ?? {}
  const numItems = Object.values(inventory).length
  const emptySlots = Array.from({ length: MAX_INVENTORY_SIZE - numItems })

  return (
    <div>
      <div className="text-xl mb-1">Inventory</div>
      <div className="grid grid-cols-4 gap-2 w-full">
        {Object.entries(inventory).map(([fruitType, quantity]) => (
          <FruitQuantity fruitType={fruitType as FruitType} quantity={quantity} />
        ))}
        {emptySlots.map((_, index) => (
          <div key={index} className="w-full border border-zinc-800 rounded-lg aspect-square" />
        ))}
      </div>
    </div>
  )
}
