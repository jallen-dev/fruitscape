import { useStore } from "../store"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { FRUIT_IMAGES, FruitType } from "../models/Fruit"
import { Inventory } from "./Inventory"
import { Dialog } from "./Dialog"

export function Trade() {
  const playerId = useStore((state) => state.yourPlayerId)
  const inventory = useStore((state) => state.game?.players[playerId]?.inventory)
  const tradeOpen = useStore((state) => state.tradeOpen)
  const tradePartner = useStore((state) => state.tradePartner)
  const setTradeOpen = useStore((state) => state.setTradeOpen)

  if (!tradeOpen || !tradePartner || !inventory) {
    return null
  }

  // TODO: make game not nullable
  const { offeredFruit, desiredFruit } = useStore.getState().game?.npcs[tradePartner] ?? {
    offeredFruit: FruitType.Apple,
    desiredFruit: FruitType.Apple,
  }

  return (
    <Dialog onCloseDialog={() => setTradeOpen(false)}>
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
      {Object.keys(inventory).includes(desiredFruit) && (
        <button
          onClick={() => {
            Rune.actions.tradeFruit({ playerId, exchangedFruit: desiredFruit, forFruit: offeredFruit })
          }}
        >
          Trade 1
        </button>
      )}

      <Inventory />
    </Dialog>
  )
}
