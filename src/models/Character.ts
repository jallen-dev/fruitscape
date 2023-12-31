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
  [CharacterType.Wizard]: "1_84.png",
  [CharacterType.Man]: "1_85.png",
  [CharacterType.Blacksmith]: "1_86.png",
  [CharacterType.Viking]: "1_87.png",
  [CharacterType.Warrior]: "1_88.png",
  [CharacterType.Knight1]: "1_96.png",
  [CharacterType.Knight2]: "1_97.png",
  [CharacterType.Knight3]: "1_98.png",
  [CharacterType.YoungLady]: "1_99.png",
  [CharacterType.OldLady]: "1_100.png",
  [CharacterType.Cyclops]: "1_109.png",
  [CharacterType.DarkWizard]: "1_111.png",
  [CharacterType.Archer]: "1_112.png",
}
