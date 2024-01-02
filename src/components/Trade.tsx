import { useStore } from "../store"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { FRUIT_IMAGES } from "../models/Fruit"
import { Inventory } from "./Inventory"
import { Dialog } from "./Dialog"

// TODO: there's a bug where if the player is standing on an NPC with the trade dialog closed,
// and their inventory is updated (because there's a new recipe and they got a new fruit), the trade dialog will open.
export function Trade() {
  const playerId = useStore((state) => state.yourPlayerId)
  const inventory = useStore((state) => state.game.players[playerId]?.inventory)
  const tradeOpen = useStore((state) => state.tradeOpen)
  const tradePartner = useStore((state) => state.tradePartner)
  const setTradeOpen = useStore((state) => state.setTradeOpen)

  if (!tradeOpen || !tradePartner) {
    return null
  }

  const { offeredFruit, desiredFruit } = useStore.getState().game.npcs[tradePartner]

  return (
    <Dialog title="Trade" onCloseDialog={() => setTradeOpen(false)}>
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
          className="bg-blue-600 text-white rounded-md px-4 py-2"
          onClick={() => {
            Rune.actions.tradeFruit({ exchangedFruit: desiredFruit, forFruit: offeredFruit })
          }}
        >
          Trade 1
        </button>
      )}

      <Inventory />
    </Dialog>
  )
}
