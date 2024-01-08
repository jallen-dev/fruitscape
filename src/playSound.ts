const SOUNDS = {
  openDialog: new Audio("audio/open_dialog.ogg"),
  closeDialog: new Audio("audio/close_dialog.ogg"),
  openChest: new Audio("audio/open_chest.ogg"),
  closeChest: new Audio("audio/close_chest.ogg"),
  addFruit: new Audio("audio/add_fruit.ogg"),
  tradeFruit: new Audio("audio/trade_fruit.ogg"),
}

export function playSound(sound: keyof typeof SOUNDS) {
  SOUNDS[sound].play()
}
