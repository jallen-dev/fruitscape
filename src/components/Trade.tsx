import { useStore } from "../store"
import { Inventory } from "./Inventory"
import { Dialog } from "./Dialog"
import { SwapFruit } from "./SwapFruit"

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
      <SwapFruit fromFruit={desiredFruit} toFruit={offeredFruit} />
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
