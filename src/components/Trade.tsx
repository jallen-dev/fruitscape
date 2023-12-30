import { useStore } from "../store"
import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon, ArrowRightIcon } from "@radix-ui/react-icons"
import { FRUIT_IMAGES, FruitType } from "../models/Fruit"
import { Inventory } from "./Inventory"

export function Trade() {
  const tradeOpen = useStore((state) => state.tradeOpen)
  const tradePartner = useStore((state) => state.tradePartner)
  const setTradeOpen = useStore((state) => state.setTradeOpen)

  if (!tradeOpen || !tradePartner) {
    return null
  }

  // TODO: make game not nullable
  const { offeredFruit, desiredFruit } = useStore.getState().game?.npcs[tradePartner] ?? {
    offeredFruit: FruitType.Apple,
    desiredFruit: FruitType.Apple,
  }

  return (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black w-full h-full absolute opacity-50" onClick={() => setTradeOpen(false)} />
        <Dialog.Content className="absolute top-1/2 left-1/2 w-5/6 h-5/6 bg-amber-200 -translate-x-1/2 -translate-y-1/2 rounded-md p-2">
          <div className="flex flex-col items-center place-content-between h-full pt-12">
            <div className="flex gap-2 items-center">
              <img
                src={FRUIT_IMAGES[desiredFruit]}
                alt={desiredFruit}
                className="w-16 h-16 border border-zinc-800 rounded-lg"
              />
              <ArrowRightIcon />
              <img
                src={FRUIT_IMAGES[offeredFruit]}
                alt={offeredFruit}
                className="w-16 h-16 border border-zinc-800 rounded-lg"
              />
            </div>

            <Inventory />
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute right-1 top-1"
              aria-label="Close"
              onClick={() => {
                setTradeOpen(false)
              }}
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
