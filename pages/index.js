import Head from "next/head";
import DBConnection, { DBConnectionClose } from "../components/common/db";

import MeetupList from "../components/meetups/MeetupList";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="React meetups in your city" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export function getServerSideProps(context) {
//   const req = context.req;
//   const resp = context.res;
//   //console.log("req", req);
//   //console.log("resp", resp);
//   return {
//     props: {
//       meetups: DUMMY_MEETUP,
//     },
//   };
// }

export async function getStaticProps() {
  const collection = await DBConnection();
  const meetups = await collection.find().toArray();
  DBConnectionClose();
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          id: meetup._id.toString(),
        };
      }),
      revalidate: 1,
    },
  };
}
