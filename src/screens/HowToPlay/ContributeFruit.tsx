import { FruitQuantity } from "../../components/FruitQuantity"
import { FruitType } from "../../models/Fruit"

export function ContributeFruit() {
  const fruit = [FruitType.Plum, FruitType.DragonFruit, FruitType.Grapefruit, FruitType.Watermelon]

  return (
    <div className="flex gap-2 w-full h-full">
      {fruit.map((fruit, index) => (
        <div className="relative w-full h-full" key={index}>
          <FruitQuantity fruitType={fruit} quantity={1} />
          {index === 2 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-md px-1">
              Add
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
