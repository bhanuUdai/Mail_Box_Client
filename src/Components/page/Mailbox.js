import React, { useEffect } from "react";
import classes from "./Mailbox.module.css";
import Inbox from "./Inbox/Inbox";
import useHttp from "../Hook/useHttp";
import { Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { manageEmailActions } from "../store/manage-email-reducer";
import ComposeMail from "./ComposeMail/ComposeMail";
import Welcome from "./Welcome";
const Mailbox = () => {
  const history = useHistory();
  const [error, sendRequest] = useHttp();
  const ComposeMailHandler = () => {
    history.push("/compose-mail");
  };
  const userEmail = useSelector((state) => state.auth.MailBoxId);
  const dispatch = useDispatch();
  const receiveMail = useSelector((state) => state.mailmanager.receive);
  console.log(receiveMail)
  useEffect(() => {
    const resData = (res) => {
      console.log(res.data);
      dispatch(manageEmailActions.setReceiveMail(res.data));
    };

    sendRequest(
      {
        request: "get",
        url: `https://mail-box-client-2811f-default-rtdb.firebaseio.com/receive${userEmail}.json`,
        header: { "Content-type": "application/json" },
      },
      resData
    );
  }, []);

  return (
    <React.Fragment>
        <main className={classes.main}>
      <section className={classes.section}>
        <h4>Your Mail Box</h4>
        <button onClick={()=>{history.push('/mailbox/compose')}}>Compose</button>
        <button onClick={()=>{history.push('/mailbox/inbox')}} >Inbox</button>
        <button >Sent</button>
      </section>
      <Route path='/mailbox/inbox' >
      <section className={classes.inbox_main} >
        {receiveMail.map((mail) => {
         return( <Inbox mails={mail} />)
        })}
      </section>
      </Route>
      <Route path='/mailbox/compose' >
        <ComposeMail/>
      </Route>
      <Route path='/mailbox/welcome' >
        <Welcome/>
      </Route>
      </main>
    </React.Fragment>
  );
};

export default Mailbox;
