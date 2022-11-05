import './App.css';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import React from 'react';
import Auth from './Components/Auth/Auth';
function App() {
  return (
    <React.Fragment>
    <Header/>
    <Auth></Auth>
    <Footer/>
    </React.Fragment>
   
  );
}

export default App;
