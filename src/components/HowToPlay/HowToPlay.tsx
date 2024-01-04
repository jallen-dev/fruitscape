import { useState } from "react"
import { Dialog } from "../Dialog"
import { FruitType } from "../../models/Fruit"
import { SwapFruit } from "../SwapFruit"
import { ContributeFruit } from "./ContributeFruit"

export function HowToPlay() {
  const [dialogOpen, setDialogOpen] = useState(true)
  return (
    <>
      {!dialogOpen && (
        <button className="absolute left-1/2 bottom-6 -translate-x-1/2" onClick={() => setDialogOpen(true)}>
          How to play
        </button>
      )}
      <Dialog title="How to Play" open={dialogOpen} color="bg-white" onCloseDialog={() => setDialogOpen(false)}>
        <div className="flex flex-col items-center justify-between h-full">
          <div>
            1. Tap on a character to trade
            <div className="relative">
              <img src="howtoplay1.png" alt="how to play 1" className="w-96" />
              <div className="absolute top-1 right-1 bg-amber-200 p-1 rounded-lg h-1/2 w-1/2 overflow-hidden flex items-center">
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
          <button className="text-xl bg-blue-600 text-white rounded-md p-2" onClick={() => setDialogOpen(false)}>
            Got it
          </button>
        </div>
      </Dialog>
    </>
  )
}
