import styles from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
  return (
    <section className={styles.detail}>
      <img src={props.image} alt="A First Meetup"></img>
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupDetail;
