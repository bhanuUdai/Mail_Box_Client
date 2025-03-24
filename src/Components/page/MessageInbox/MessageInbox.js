import React from "react";
import classes from "./MessageInbox.module.css";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../../Hook/useHttp";
import { manageEmailActions } from "../../store/manage-email-reducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';

const MessageInbox = () => {
  const mails = useSelector((state) => state.mailmanager.receive);
  const userMail = useSelector(state => state.auth.MailBoxId);
  const { id } = useParams();
  const [error, sendRequest] = useHttp();
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(mails, "==>MESSAGE");
  let arr = mails.find((index) => index.id === id);

  console.log(arr);

  const deleteMailHandler = () => {
    const responseHandler = () => {
      dispatch(manageEmailActions.deleteMail(arr.id));
      toast.success('Message deleted successfully');
      history.replace('/mailbox/receiveinbox');
    };

    sendRequest(
      {
        request: "delete",
        url: `https://mail-box-client-2811f-default-rtdb.firebaseio.com/receive${userMail}/${arr.id}.json`,
        header: { "Content-type": "application/json" },
      },
      responseHandler
    );
  };

  return (
    <div className={classes.container}>
      <ToastContainer /> {/* Add ToastContainer here */}
      {error && <h2 className={classes.error}>{error}</h2>}
      <h3 className={classes.heading}>INBOX</h3>
      <main className={classes.main}>
        <h5 className={classes.subject}>{arr ? arr.subject : "loading.."}</h5>
        <p className={classes.message}>{arr ? arr.message : "loading.."}</p>
      </main>
      <button className={classes.delete_button} onClick={deleteMailHandler}>
        <FontAwesomeIcon icon={faTrash} className={classes.icon} /> Delete Mail
      </button>
    </div>
  );
};

export default MessageInbox;
