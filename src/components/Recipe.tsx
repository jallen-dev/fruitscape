import { FRUIT_IMAGES, FruitType } from "../models/Fruit"
import { useStore } from "../store"
import { Dialog } from "./Dialog"
import { FruitQuantity } from "./FruitQuantity"
import { Inventory } from "./Inventory"
import { CheckIcon } from "@radix-ui/react-icons"

export function Recipe() {
  const inventory = useStore((state) => state.game?.players[state.yourPlayerId].inventory) ?? {}
  const currentRecipe = useStore((state) => state.game?.currentRecipe)
  const recipeOpen = useStore((state) => state.recipeOpen)
  const setRecipeOpen = useStore((state) => state.setRecipeOpen)

  if (!recipeOpen || !currentRecipe) {
    return null
  }

  const gridCols = Object.keys(currentRecipe).length > 3 ? "grid-cols-4" : "grid-cols-3"

  const nonSatisfiedIngredients = Object.entries(currentRecipe).filter(
    ([fruitType, quantity]) => (inventory[fruitType as FruitType] ?? 0) < quantity
  )

  const satisfiedIngredients = Object.entries(currentRecipe).filter(
    ([fruitType, quantity]) => (inventory[fruitType as FruitType] ?? 0) >= quantity
  )

  return (
    <Dialog onCloseDialog={() => setRecipeOpen(false)}>
      <div className={`grid ${gridCols} gap-2 w-full`}>
        {nonSatisfiedIngredients.map(([fruitType, quantity]) => (
          <FruitQuantity fruitType={fruitType as FruitType} quantity={quantity} />
        ))}
        {satisfiedIngredients.map(([fruitType, quantity]) => (
          <SatisfiedIngredient fruitType={fruitType as FruitType} />
        ))}
      </div>
      {nonSatisfiedIngredients.length === 0 && <button>Build</button>}
      <Inventory />
    </Dialog>
  )
}

function SatisfiedIngredient({ fruitType }: { fruitType: FruitType }) {
  return (
    <div className="relative border border-zinc-800 rounded-lg aspect-square">
      <img
        src={FRUIT_IMAGES[fruitType as FruitType]}
        alt={fruitType}
        key={fruitType}
        className="w-full h-full opacity-40"
      />
      <CheckIcon className="absolute w-full h-full top-0 text-green-800" />
    </div>
  )
}
