import DBConnection, { DBConnectionClose } from "../../components/common/db";
import { ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";
export default function MeetupDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.meetupDetailsData.title}</title>
        <meta
          name="description"
          content={props.meetupDetailsData.description}
        />
      </Head>
      <MeetupDetail
        image={props.meetupDetailsData.image}
        title={props.meetupDetailsData.title}
        address={props.meetupDetailsData.address}
        description={props.meetupDetailsData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const collection = await DBConnection();
  const meetupIds = await collection.find({}, { _id: 1 }).toArray();

  DBConnectionClose();
  return {
    fallback: "blocking",
    paths: meetupIds.map((id) => ({ params: { meetupId: id._id.toString() } })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const connection = await DBConnection();
  const selectedMeetup = await connection.findOne({
    _id: new ObjectId(meetupId),
  });
  console.log("selectedMeetup", selectedMeetup);
  return {
    props: {
      meetupDetailsData: {
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        id: selectedMeetup._id.toString(),
      },
    },
  };
}
