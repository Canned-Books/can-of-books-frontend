import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import Profile from './About';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <>
        <Router>
          <Header />
           <Routes>
            <Route exact path="/" element={<BestBooks />}></Route>
            <Route exact path="/about" element = {<Profile />}></Route>
          </Routes>
        <Footer />
        </Router>
      </>
    )
  }
}

export default App;