import './App.css';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import React from 'react';
import Auth from './Components/Auth/Auth';
import Mailbox from './Components/page/Mailbox';
import {Route, Switch} from 'react-router-dom'
import ComposeMail from './Components/page/ComposeMail/ComposeMail';
function App() {
  return (
    <React.Fragment>
    <Header/>
    <Switch>
      <Route path="/" exact>
      <Auth/>
      </Route>
      <Route path='/mailbox' >
      <Mailbox/>
      </Route>
      <Route path='/compose-mail'>
      <ComposeMail/>
      </Route>
    </Switch>
    <Footer/>
    </React.Fragment>
   
  );
}

export default App;
