import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";

const EventsPage = () => {
  const events = getAllEvents();

  return (
    <div>
      <EventList events={events} />
    </div>
  );
};

export default EventsPage;
