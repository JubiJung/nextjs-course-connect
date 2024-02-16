import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta name="description" content="Add your new meetups"></meta>
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetupHandler} />
    </>
  );
};
export default NewMeetupPage;
