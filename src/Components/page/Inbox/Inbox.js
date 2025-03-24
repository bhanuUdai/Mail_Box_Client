import React from "react";
import classes from "./Inbox.module.css";
import { NavLink } from "react-router-dom";
import useHttp from "../../Hook/useHttp";
import { useSelector, useDispatch } from "react-redux";
import { manageEmailActions } from "../../store/manage-email-reducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Inbox = (prop) => {
  const [error, sendRequest] = useHttp();
  const userMail = useSelector((state) => state.auth.MailBoxId);
  const dispatch = useDispatch();

  const removeSeenHandler = () => {
    const dataObj = {
      seen: true,
    };
    const responseHandler = (res) => {
      if (prop.type === "receive") {
        dispatch(manageEmailActions.seenMessage(prop.mails.id));
      } else {
        dispatch(manageEmailActions.seenSentMessageHandler(prop.mails.id));
      }
    };
    sendRequest(
      {
        request: "patch",
        url: `https://mail-box-client-2811f-default-rtdb.firebaseio.com/${prop.type}${userMail}/${prop.mails.id}.json`,
        data: dataObj,
        header: { "Content-type": "application/json" },
      },
      responseHandler
    );
  };

  const formatTime = (timeString) => {
    if (!timeString) {
      return "Invalid Date";
    }
    
    try {
      // Split the date and time parts
      const [datePart, timePart] = timeString.split(', ');
      const [day, month, year] = datePart.split('/');
      const [hours, minutes] = timePart.split(':');
  
      // Create a new Date object using the parsed values
      const date = new Date(year, month - 1, day, hours, minutes);
  
      if (isNaN(date.getTime())) {
        throw new Error("Invalid Date");
      }
  
      const formattedMonth = date.toLocaleString('default', { month: 'short' });
      return `${day} ${formattedMonth} ${year} ${hours}:${minutes}`;
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid Date";
    }
  };

  return (
    <React.Fragment>
      <main className={classes.main}>
        <ul>
          <li className={classes.list}>
            <NavLink
              onClick={removeSeenHandler}
              to={`/mailbox/${prop.type}message/${prop.mails.id}`}
            >
              <FontAwesomeIcon icon={prop.mails.seen ? faEnvelopeOpen : faEnvelope} className={classes.icon} />
              {prop.mails?.subject}
            </NavLink>
            <span className={classes.time}>{formatTime(prop.mails?.time)}</span> {/* Render formatted time */}
          </li>
        </ul>
      </main>
    </React.Fragment>
  );
};

export default Inbox;
