import { CharacterSelect } from "../screens/CharacterSelect/CharacterSelect"
import { Game } from "../screens/Game/Game"
import { HowToPlay } from "../screens/HowToPlay/HowToPlay"

export type Screen = "characterSelect" | "howToPlay" | "game"

export const SCREENS: { [S in Screen]: () => React.JSX.Element | null } = {
  characterSelect: CharacterSelect,
  game: Game,
  howToPlay: HowToPlay,
} as const
