import { CharacterSelect } from "@/screens/CharacterSelect/CharacterSelect"
import { Play } from "@/screens/Game/Play"
import { Spectate } from "@/screens/Game/Spectate"
import { HowToPlay } from "@/screens/HowToPlay/HowToPlay"

export type Screen = "characterSelect" | "howToPlay" | "play" | "spectate"

export const SCREENS: { [S in Screen]: () => React.JSX.Element | null } = {
  characterSelect: CharacterSelect,
  play: Play,
  howToPlay: HowToPlay,
  spectate: Spectate,
} as const
