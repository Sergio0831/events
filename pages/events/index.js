import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { useRouter } from "next/router";

const EventsPage = ({ events }) => {
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const events = getAllEvents();

  return {
    props: {
      events
    },
    revalidate: 60
  };
};

export default EventsPage;
