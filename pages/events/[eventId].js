import { getAllEvents, getEventById } from "../../helpers/api-util";
import Head from "next/head";
import {
  EventSummary,
  EventLogistics,
  EventContent
} from "../../components/event-detail";
import { ErrorAlert } from "../../components/ui";
import { getFeaturedEvents } from "../../dummy-data";
import { Comments } from "../../components/input";

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
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
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
