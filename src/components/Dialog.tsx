import * as RadixDialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"

export function Dialog({ children, onCloseDialog }: { children: React.ReactNode; onCloseDialog: () => void }) {
  return (
    <RadixDialog.Root open={true}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="bg-black w-full h-full absolute opacity-50" onClick={onCloseDialog} />
        <RadixDialog.Content className="absolute top-1/2 left-1/2 w-5/6 h-5/6 bg-amber-200 -translate-x-1/2 -translate-y-1/2 rounded-md p-2">
          {children}

          <RadixDialog.Close asChild>
            <button className="absolute right-1 top-1" aria-label="Close" onClick={onCloseDialog}>
              <Cross2Icon />
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
