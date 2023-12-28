import { useStore } from "../store";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export function Trade() {
  const tradeOpen = useStore((state) => state.tradeOpen);
  const setTradeOpen = useStore((state) => state.setTradeOpen);

  if (!tradeOpen) {
    return null;
  }

  return (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black w-full h-full absolute opacity-50" onClick={() => setTradeOpen(false)} />
        <Dialog.Content className="absolute top-1/2 left-1/2 w-5/6 h-5/6 bg-amber-200 -translate-x-1/2 -translate-y-1/2 rounded-md">
          <Dialog.Title>Trade</Dialog.Title>
          <Dialog.Description />
          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4"
              aria-label="Close"
              onClick={() => {
                setTradeOpen(false);
              }}
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
