import { CharacterSelect } from "@/screens/CharacterSelect/CharacterSelect"
import { Game } from "@/screens/Game/Game"
import { HowToPlay } from "@/screens/HowToPlay/HowToPlay"
import { Spectate } from "@/screens/Spectate/Spectate"

export type Screen = "characterSelect" | "howToPlay" | "game" | "spectate"

export const SCREENS: { [S in Screen]: () => React.JSX.Element | null } = {
  characterSelect: CharacterSelect,
  game: Game,
  howToPlay: HowToPlay,
  spectate: Spectate,
} as const
