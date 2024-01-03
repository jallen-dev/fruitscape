import { useState } from "react"
import { Dialog } from "./Dialog"
import { FruitType } from "../models/Fruit"
import { SwapFruit } from "./SwapFruit"

export function HowToPlay() {
  const [dialogOpen, setDialogOpen] = useState(true)
  return (
    <>
      {!dialogOpen && (
        <button className="absolute left-1/2 bottom-6 -translate-x-1/2" onClick={() => setDialogOpen(true)}>
          How to play
        </button>
      )}
      <Dialog title="How to Play" open={dialogOpen} onCloseDialog={() => setDialogOpen(false)}>
        <div className="flex flex-col items-center">
          <div>
            Tap on a character to trade
            <div className="relative">
              <img src="howtoplay1.png" alt="how to play 1" className="w-96" />
              <div className="absolute top-3 right-3 bg-amber-200 p-1 rounded h-1/2 w-1/2 overflow-hidden flex items-center">
                <SwapFruit fromFruit={FruitType.GreenGrape} toFruit={FruitType.Grapefruit} />
              </div>
            </div>
          </div>
          <div>Deliver fruit to the chest</div>
          <div>Complete the recipe to unlock the next one</div>
        </div>
      </Dialog>
    </>
  )
}
