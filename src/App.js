import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
    }
  }

  //To do Handler to get all books
  
  render(){
    return (
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<BestBooks />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </Router>
    );
  }
}

export default App;




/*
{
  this.state.books.length > 0 &&
  <>
    {this.state.books.map(book => {
      return <p key={book._id}>{book.name} is a {book.description}</p>
    })}
  </>
}
*/