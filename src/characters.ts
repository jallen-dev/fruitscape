const wizard = "set2/tile_0084.png" as const;
const man = "set2/tile_0085.png" as const;
const blacksmith = "set2/tile_0086.png" as const;
const viking = "set2/tile_0087.png" as const;
const warrior = "set2/tile_0088.png" as const;
const knight1 = "set2/tile_0096.png" as const;
const knight2 = "set2/tile_0097.png" as const;
const knight3 = "set2/tile_0098.png" as const;
const youngLady = "set2/tile_0099.png" as const;
const oldLady = "set2/tile_0100.png" as const;
const cyclops = "set2/tile_0109.png" as const;
const darkWizard = "set2/tile_0111.png" as const;
const archer = "set2/tile_0112.png" as const;

export const ALL_CHARACTERS = [
  wizard,
  man,
  blacksmith,
  viking,
  warrior,
  knight1,
  knight2,
  knight3,
  youngLady,
  oldLady,
  cyclops,
  darkWizard,
  archer,
] as const;

export type CharacterType = (typeof ALL_CHARACTERS)[number];
