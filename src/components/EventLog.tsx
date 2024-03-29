import { Event } from "@/models/Event"
import { useStore } from "@/store"

export function EventLog() {
  const events = useStore((state) => state.game.events)

  return (
    <div className="absolute top-0 left-0 pointer-events-none text-left text-white font-bold p-1">
      {events.map((event) => (
        <EventLogItem event={event} key={event.id} />
      ))}
    </div>
  )
}

function EventLogItem({ event }: { event: Event }) {
  const playerDetails = useStore((state) => state.playerDetails)
  switch (event.type) {
    case "fruitAdded": {
      return (
        <div>
          {playerDetails[event.playerId].displayName} added {event.quantity} {event.fruit}!
        </div>
      )
    }
    case "recipeCompleted": {
      return <div>Recipe complete!</div>
    }
    case "fruitGranted": {
      return (
        <div>
          {playerDetails[event.playerId].displayName} got {event.quantity} {event.fruit}!
        </div>
      )
    }
  }
}
