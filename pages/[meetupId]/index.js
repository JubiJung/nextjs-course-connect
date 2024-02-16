import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        image={props.meetupData.image}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};

//
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://jubi1838:5BnpzlPnZf6GbPq9@cluster0.fmfz8dt.mongodb.net/connect?retryWrites=true&w=majority"
  );
  const db = client.db();
  const connectCollection = db.collection("connect");
  const connects = await connectCollection.find({}, { _id: 1 }).toArray();
  return {
    fallback: false,
    paths: connects.map((connect) => ({
      params: {
        meetupId: connect._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://jubi1838:5BnpzlPnZf6GbPq9@cluster0.fmfz8dt.mongodb.net/connect?retryWrites=true&w=majority"
  );
  const db = client.db();
  const connectCollection = db.collection("connect");
  //사실 MongoDB에서 ID는 이상한 객체 ID라는 것을 명심하세요. 특정 ID를 정확하게 찾으려면 이것을 문자열에서 객체 ID로
  const selectedConnect = await connectCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedConnect._id.toString(),
        title: selectedConnect.title,
        image: selectedConnect.image,
        address: selectedConnect.address,
        description: selectedConnect.description,
      },
    },
  };
}

export default MeetupDetails;
