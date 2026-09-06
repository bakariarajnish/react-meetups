import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

export default function NewMeetupPage() {
  const router = useRouter();
  const newMeetupHandler = async (enteredMeetupdata) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupdata),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    router.replace("/");
  };
  return <NewMeetupForm onAddMeetup={newMeetupHandler} />;
}
