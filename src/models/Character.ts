export enum CharacterType {
  Wizard = "Wizard",
  Man = "Man",
  Blacksmith = "Blacksmith",
  Viking = "Viking",
  Warrior = "Warrior",
  Knight1 = "Knight1",
  Knight2 = "Knight2",
  Knight3 = "Knight3",
  YoungLady = "Young Lady",
  OldLady = "Old Lady",
  Cyclops = "Cyclops",
  DarkWizard = "Dark Wizard",
  Archer = "Archer",
}

export const ALL_CHARACTER_TYPES = Object.values(CharacterType)

export const CHARACTER_IMAGES: Record<CharacterType, string> = {
  [CharacterType.Wizard]: "set2/tile_0084.png",
  [CharacterType.Man]: "set2/tile_0085.png",
  [CharacterType.Blacksmith]: "set2/tile_0086.png",
  [CharacterType.Viking]: "set2/tile_0087.png",
  [CharacterType.Warrior]: "set2/tile_0088.png",
  [CharacterType.Knight1]: "set2/tile_0096.png",
  [CharacterType.Knight2]: "set2/tile_0097.png",
  [CharacterType.Knight3]: "set2/tile_0098.png",
  [CharacterType.YoungLady]: "set2/tile_0099.png",
  [CharacterType.OldLady]: "set2/tile_0100.png",
  [CharacterType.Cyclops]: "set2/tile_0109.png",
  [CharacterType.DarkWizard]: "set2/tile_0111.png",
  [CharacterType.Archer]: "set2/tile_0112.png",
}
