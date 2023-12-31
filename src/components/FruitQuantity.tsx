import { FRUIT_IMAGES, FruitType } from "../models/Fruit"

export function FruitQuantity({ fruitType, quantity }: { fruitType: FruitType; quantity: number }) {
  return (
    <div className="relative border border-zinc-800 rounded-lg aspect-square">
      <img src={FRUIT_IMAGES[fruitType as FruitType]} alt={fruitType} key={fruitType} className="w-full h-full" />
      <div className="absolute -top-1 -right-1 text-white text-sm font-bold bg-zinc-700 rounded-sm px-0.5 leading-snug tabular-nums">
        {quantity}
      </div>
    </div>
  )
}
