import { FRUIT_IMAGES, FruitType } from "@/models/Fruit"
import { ArrowRightIcon } from "@radix-ui/react-icons"

export function SwapFruit({ fromFruit, toFruit }: { fromFruit: FruitType; toFruit: FruitType }) {
  return (
    <div className="flex gap-2 items-center w-full">
      <img src={FRUIT_IMAGES[fromFruit]} alt={fromFruit} className="grow border border-zinc-800 rounded-lg" />
      <ArrowRightIcon width={24} height={24} />
      <img src={FRUIT_IMAGES[toFruit]} alt={toFruit} className="grow border border-zinc-800 rounded-lg" />
    </div>
  )
}
