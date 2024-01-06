import { FruitType } from "../../models/Fruit"
import { SwapFruit } from "../../components/SwapFruit"
import { ContributeFruit } from "./ContributeFruit"
import { useStore } from "../../store"

export function HowToPlay() {
  const setScreen = useStore((state) => state.setScreen)
  return (
    <div className="flex flex-col items-center justify-around h-full text-white text-xl">
      <div>
        1. Tap on a character to trade
        <div className="relative">
          <img src="howtoplay1.png" alt="how to play 1" className="w-96" />
          <div className="absolute top-1 right-1 bg-amber-200 p-1 rounded-lg h-1/2 w-1/2 overflow-hidden flex items-center text-black">
            <SwapFruit fromFruit={FruitType.GreenGrape} toFruit={FruitType.Grapefruit} />
          </div>
        </div>
      </div>
      <div>
        2. Deliver fruit to the chest
        <div className="relative">
          <img src="howtoplay2.png" alt="how to play 1" className="w-96" />
          <div className="absolute top-0 w-full h-1/2 p-1">
            <div className="bg-amber-200 p-2 rounded-lg">
              <ContributeFruit />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">3. Complete the recipe to unlock the next one</div>
      <button className="text-xl bg-blue-600 rounded-md p-2 px-8" onClick={() => setScreen("characterSelect")}>
        Got it
      </button>
    </div>
  )
}
