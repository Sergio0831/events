import { getAllEvents, getEventById } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getFeaturedEvents } from "../../dummy-data";

const EventDetailPage = ({ event }) => {
  if (!event) {
    return (
      <ErrorAlert>
        <h2>Loading...</h2>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export const getStaticProps = async (context) => {
  const { eventId } = context.params;
  const event = await getEventById(eventId);

  return {
    props: {
      event
    },
    revalidate: 30
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking"
  };
};

export default EventDetailPage;
