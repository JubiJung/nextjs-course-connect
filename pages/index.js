import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React connect</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://jubi1838:5BnpzlPnZf6GbPq9@cluster0.fmfz8dt.mongodb.net/connect?retryWrites=true&w=majority"
  );
  const db = client.db();
  const connectCollection = db.collection("connect");
  const connects = await connectCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: connects.map((connect) => ({
        image: connect.image,
        address: connect.address,
        title: connect.title,
        id: connect._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
