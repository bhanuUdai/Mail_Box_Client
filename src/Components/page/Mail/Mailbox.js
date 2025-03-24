import React from "react";
import classes from "./Mailbox.module.css";
import Inbox from "../Inbox/Inbox";
import { Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ComposeMail from "../ComposeMail/ComposeMail";
import Welcome from "../Welcome";
import { useParams } from "react-router-dom";
import MessageInbox from "../MessageInbox/MessageInbox";
import SentBox from "../SentBox/SentBox";
// Import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons';

const Mailbox = () => {
  const history = useHistory();
  const receiveMail = useSelector((state) => state.mailmanager.receive);
  const sentMail = useSelector((state) => state.mailmanager.sent);
  const { id } = useParams();

  let unSeen = 0;
  receiveMail.forEach((data) => {
    if (data.seen === false) {
      unSeen = unSeen + 1;
    }
  });

  return (
    <React.Fragment>
      <main className={classes.main}>
        <section className={classes.section}>
          <h4>Your Mail Box</h4>
          <button onClick={() => history.push("/mailbox/compose")}>
            <FontAwesomeIcon icon={faPlus} /> Compose
          </button>
          <button onClick={() => history.push("/mailbox/receiveinbox")}>
            <FontAwesomeIcon icon={faEnvelope} /> {`Inbox ${unSeen}`}
          </button>
          <button onClick={() => history.push("/mailbox/inbox")}>
            <FontAwesomeIcon icon={faPaperPlane} /> Sent
          </button>
        </section>
        <Route path="/mailbox/receiveinbox">
          <section className={classes.inbox_main}>
          <h2 className={classes.heading}>INBOX</h2>
          <section className={classes.innerSection}>
            {receiveMail.map((mail) => (
              <Inbox key={mail.id} mails={mail} type={"receive"} />
            ))}

          </section>
          </section>
        </Route>
        <Route path="/mailbox/receivemessage/:id">
          <MessageInbox />
        </Route>
        <Route path="/mailbox/sentmessage/:id">
          <SentBox />
        </Route>
        <Route path="/mailbox/compose">
          <ComposeMail />
        </Route>
        <Route path="/mailbox/welcome">
          <Welcome />
        </Route>
        <Route path="/mailbox/inbox">
          <section className={classes.inbox_main}>
            <h2 className={classes.heading} >SENT</h2>
            <section className={classes.innerSection}>
            {sentMail.map((mail) => (
              <Inbox key={mail.id} mails={mail} type={"sent"} />
            ))}

            </section>
          </section>
        </Route>
      </main>
    </React.Fragment>
  );
};

export default Mailbox;
