import { useStore } from "../store"
import { Inventory } from "./Inventory"
import { Dialog } from "./Dialog"
import { SwapFruit } from "./SwapFruit"
import { playSound } from "../playSound"

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
  const hasDesiredFruit = Object.keys(inventory).includes(desiredFruit)

  function closeDialog() {
    setTradeOpen(false)
    playSound("closeDialog")
  }

  return (
    <Dialog title="Trade" onCloseDialog={closeDialog}>
      <SwapFruit fromFruit={desiredFruit} toFruit={offeredFruit} />
      <div className="flex flex-col items-center gap-2">
        {hasDesiredFruit ? (
          <>
            <span className="text-center">
              &ldquo;I&apos;ll trade you my {offeredFruit} for your {desiredFruit}.&rdquo;
            </span>
            <button
              className="bg-blue-600 text-white rounded-md px-4 py-2"
              onClick={() => {
                Rune.actions.tradeFruit({ exchangedFruit: desiredFruit, forFruit: offeredFruit })
                playSound("tradeFruit")
              }}
            >
              Trade 1
            </button>
          </>
        ) : (
          <>
            <span className="text-center">
              &ldquo;You don&apos;t have any {desiredFruit}. Come back when you do.&rdquo;
            </span>
            <button className="bg-blue-600 text-white rounded-md px-4 py-2" onClick={closeDialog}>
              I&apos;ll come back
            </button>
          </>
        )}
      </div>

      <Inventory />
    </Dialog>
  )
}
