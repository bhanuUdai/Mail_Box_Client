import "./App.css";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import React, { useEffect } from "react";
import Auth from "./Components/Auth/Auth";
import Mailbox from "./Components/page/Mail/Mailbox";
import { Route, Switch } from "react-router-dom";
import MessageInbox from "./Components/page/MessageInbox/MessageInbox";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreater } from "./Components/store/store-actions";
function App() {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.MailBoxId);
  // useEffect(() => {
  //   console.log('INSIDE APP ACTION')
   
  // }, []);
  dispatch(ActionCreater(userEmail));
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Route path="/mailbox/:id">
          <Mailbox />
        </Route>

        <Route path="/message/:id">
          <MessageInbox />
        </Route>
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
