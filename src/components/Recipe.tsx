import { Dialog } from "@/components/Dialog"
import { FruitQuantity } from "@/components/FruitQuantity"
import { Inventory } from "@/components/Inventory"
import { FRUIT_IMAGES, FruitType } from "@/models/Fruit"
import { playSound } from "@/playSound"
import { useStore } from "@/store"
import { CheckIcon } from "@radix-ui/react-icons"

export function Recipe() {
  const currentRecipe = useStore((state) => state.game.currentRecipe)
  const contributedIngredients = useStore((state) => state.game.contributedIngredients)
  const recipeOpen = useStore((state) => state.recipeOpen)
  const setRecipeOpen = useStore((state) => state.setRecipeOpen)

  if (!recipeOpen || !contributedIngredients) {
    return null
  }

  const gridCols = Object.keys(currentRecipe).length > 3 ? "grid-cols-4" : "grid-cols-3"

  const unSatisfiedIngredients = Object.entries(currentRecipe).filter(
    ([fruitType, quantity]) => (contributedIngredients[fruitType as FruitType] ?? 0) < quantity,
  )

  const satisfiedIngredients = Object.entries(currentRecipe).filter(
    ([fruitType, quantity]) => (contributedIngredients[fruitType as FruitType] ?? 0) >= quantity,
  )

  function closeDialog() {
    setRecipeOpen(false)
    playSound("closeChest")
  }

  return (
    <Dialog title="Contribute Fruit" onCloseDialog={closeDialog}>
      <div className={`grid ${gridCols} gap-2 w-full`}>
        {unSatisfiedIngredients.map(([fruitType, quantity]) => (
          <UnSatisfiedIngredient
            fruit={fruitType as FruitType}
            quantity={quantity - (contributedIngredients[fruitType as FruitType] ?? 0)}
            key={fruitType}
          />
        ))}
        {satisfiedIngredients.map(([fruitType]) => (
          <SatisfiedIngredient fruit={fruitType as FruitType} key={fruitType} />
        ))}
      </div>
      <Inventory />
    </Dialog>
  )
}

function UnSatisfiedIngredient({ fruit, quantity }: { fruit: FruitType; quantity: number }) {
  const playerId = useStore((state) => state.yourPlayerId)
  const inventory = useStore((state) => state.game.players[playerId].inventory)

  return (
    <div className="relative">
      <FruitQuantity fruitType={fruit as FruitType} quantity={quantity} />
      {Object.keys(inventory).includes(fruit) && (
        <button
          className="bg-blue-600 text-white rounded-md px-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={() => {
            Rune.actions.addFruit({ fruit })
            playSound("addFruit")
          }}
        >
          Add
        </button>
      )}
    </div>
  )
}

function SatisfiedIngredient({ fruit }: { fruit: FruitType }) {
  return (
    <div className="relative border border-zinc-800 rounded-lg aspect-square">
      <img src={FRUIT_IMAGES[fruit as FruitType]} alt={fruit} key={fruit} className="w-full h-full opacity-40" />
      <CheckIcon className="absolute w-full h-full top-0 text-green-800" />
    </div>
  )
}
