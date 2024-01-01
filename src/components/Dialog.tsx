import * as RadixDialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"

export function Dialog({
  title,
  children,
  onCloseDialog,
}: {
  title: string
  children: React.ReactNode
  onCloseDialog: () => void
}) {
  return (
    <RadixDialog.Root open={true}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="bg-black w-full h-full absolute opacity-50" onClick={onCloseDialog} />
        <RadixDialog.Content className="absolute top-1/2 left-1/2 w-5/6 h-5/6 bg-amber-200 -translate-x-1/2 -translate-y-1/2 rounded-md p-2 overflow-hidden flex flex-col">
          <RadixDialog.Title className="text-xl">{title}</RadixDialog.Title>
          <div className="flex flex-col items-center place-content-between h-full pt-2">{children}</div>
          <RadixDialog.Close asChild>
            <button className="absolute right-1 top-1 p-2" aria-label="Close" onClick={onCloseDialog}>
              <Cross2Icon className="w-6 h-6" />
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
