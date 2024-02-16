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

// //얘는 getStaticProps랑 다르게 요청시 마다 데이터를 가져옴
// //이게 항상 더 좋아보이지만 뭐든 상황에 맞게 쓰는게 좋다..
// //req, res 데이터가 필요하고, 데이터를 정말 자주 요청한다면 이쪽을 쓰는게 나을지도
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

//아래 코드를 통해서 사전 렌더링의 단점을 보완할 수 있음.
//캐싱을 이용할 수 있고, 페이지를 여러 번 프리 제너레이트할 필요가 없다.
export async function getStaticProps() {
  //데이터를 얻어오는 코드
  //데이터를 얻어왔으면 객체를 return 해야됨
  const client = await MongoClient.connect(
    "mongodb+srv://jubi1838:5BnpzlPnZf6GbPq9@cluster0.fmfz8dt.mongodb.net/connect?retryWrites=true&w=majority"
  );
  const db = client.db();
  const connectCollection = db.collection("connect");
  const connects = await connectCollection.find().toArray();
  client.close();
  return {
    //여기 props 값인 객체가 해당 컴포넌트에서 사용하게 될 props임
    props: {
      meetups: connects.map((connect) => ({
        image: connect.image,
        address: connect.address,
        title: connect.title,
        id: connect._id.toString(),
      })),
    },
    //revalidate를 설정하면 데이터가 변경되었다고 해서 재 build 후 배포를 할 필요가 없다.
    revalidate: 10,
  };
}

export default HomePage;
