import { ALL_CHARACTER_TYPES, CharacterType } from "../../models/Character"
import { useStore } from "../../store"

export function CharacterSelect() {
  const playerDetails = useStore((state) => state.playerDetails)
  const players = useStore((state) => state.game.players)
  const yourPlayerId = useStore((state) => state.yourPlayerId)
  const setScreen = useStore((state) => state.setScreen)

  if (!players[yourPlayerId]) {
    return null
  }

  return (
    <div className="flex flex-col justify-around overflow-hidden h-full items-center">
      <div className="flex justify-around w-full">
        {Object.values(playerDetails).map((playerDetail) => (
          <div className="grow basis-0 flex flex-col items-center overflow-hidden" key={playerDetail.playerId}>
            <Character character={players[playerDetail.playerId].character} />
            <div className="whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
              {playerDetail.playerId === yourPlayerId ? "You" : playerDetail.displayName}
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="text-xl mb-2">Choose your character</div>
        <div className="flex flex-wrap justify-between gap-2">
          {ALL_CHARACTER_TYPES.map((character) => {
            const border = character === players[yourPlayerId].character ? "border-4 box-border" : "p-1"
            return (
              <div
                className={`h-[72px] w-[72px] ${border}`}
                key={character}
                onClick={() => Rune.actions.setCharacter({ playerId: yourPlayerId, character })}
              >
                <Character character={character} />
              </div>
            )
          })}
        </div>
      </div>
      <button className="text-2xl" onClick={() => setScreen("howToPlay")}>
        How to Play?
      </button>
      <button className="text-xl bg-blue-600 rounded-md p-2 px-8" onClick={() => setScreen("game")}>
        Start
      </button>
    </div>
  )
}

function Character({ character }: { character: CharacterType }) {
  const characterIndex = ALL_CHARACTER_TYPES.indexOf(character)
  return (
    <div className="h-16 w-16">
      <div
        style={{
          backgroundPosition: `${characterIndex * -16}px 0px`,
          backgroundImage: "url(images/characters.png)",
          width: 16,
          height: 16,
          transform: "scale(4)",
          transformOrigin: "top left",
        }}
      ></div>
    </div>
  )
}
