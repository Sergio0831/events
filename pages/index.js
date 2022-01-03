import Head from "next/head";
import EventList from "../components/events/EventList";
import { NewsletteRegistration } from "../components/input";
import { getFeaturedEvents } from "../helpers/api-util";

const HomePage = ({ events }) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot of events' />
      </Head>
      <NewsletteRegistration />
      <EventList events={events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  };
};

export default HomePage;
