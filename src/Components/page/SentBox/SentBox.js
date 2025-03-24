import React from "react";
import classes from "../MessageInbox/MessageInbox.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SentBox = () => {
  const sentMails = useSelector((state) => state.mailmanager.sent);
  const { id } = useParams();
  const selectedMail = sentMails.find((mail) => mail.id === id);

  if (!selectedMail) {
    return <p className={classes.error}>Mail not found. Please try again later.</p>;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Sent Mail</h1>
      <main className={classes.main}>
        <h5 className={classes.subject}>{selectedMail.subject}</h5>
        <div
          className={classes.message}
          dangerouslySetInnerHTML={{ __html: selectedMail.message }}
        />
      </main>
    </div>
  );
};

export default SentBox;
