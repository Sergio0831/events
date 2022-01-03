import { getAllEvents } from "../../dummy-data";
import Head from "next/head";
import { EventList, EventsSearch } from "../../components/events";
import { useRouter } from "next/router";

const EventsPage = ({ events }) => {
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta name='description' content='Find a lot of events' />
      </Head>
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
