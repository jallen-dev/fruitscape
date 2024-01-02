import { Event } from "../models/Event"
import { useStore } from "../store"

export function EventLog() {
  console.log("rendering EventLog")
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
  const players = useStore((state) => state.players)
  switch (event.type) {
    case "fruitAdded": {
      return (
        <div>
          {players[event.playerId].displayName} added {event.quantity} {event.fruit}!
        </div>
      )
    }
  }
}
