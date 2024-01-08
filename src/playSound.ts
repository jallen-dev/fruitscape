const SOUNDS = {
  openDialog: new Audio("audio/open_dialog.m4a"),
  closeDialog: new Audio("audio/close_dialog.m4a"),
  openChest: new Audio("audio/open_chest.m4a"),
  closeChest: new Audio("audio/close_chest.m4a"),
  addFruit: new Audio("audio/add_fruit.m4a"),
  tradeFruit: new Audio("audio/trade_fruit.m4a"),
}

export function playSound(sound: keyof typeof SOUNDS) {
  SOUNDS[sound].play()
}
