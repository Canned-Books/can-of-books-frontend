import React from 'react';
import './App.css';
import axios from 'axios';
import BestBooks from './BestBooks';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import About from './About';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
    }
  }

  //To do Handler to get all books
getAllBooks = async () => {
  try {
    let url = `${process.env.REACT_APP_SERVER}/books`

    let booksFromDB = await axios.get(url);

    this.setState({
      books: booksFromDB.data
    })
  } catch (error) {
    console.log(error.message);
  }
}

componentDidMount() {
  this.getAllBooks();
}


/** Add Book To DB using 2 handlers */

/** Handler 1 */

handleBookSubmit = (event) => {
  event.preventDefault();
  // TODO: BUILD THE Book OBJECT USING THE FORM DATA

  let bookObj = {
    title: event.target.title.value,
    description: event.target.description.value,
    author: +event.target.author.value,
    status: event.target.status.value
  }

  this.postBook(bookObj);
}

/** 2nd Handler */
postBook = async (bookObj) => {
  try {
    // TODO: build the url for axios to use
    let url = `${process.env.REACT_APP_SERVER}/books`;

    // *** ON A POST - axios will take in 2 args. 1st - url, 2nd - data which is carried 
    //over on the req.body
    let createdBookFromDB = await axios.post(url, bookObj);

    // console.log(createdBookFromDB.data);

    // TODO: get the created book and add it to state
    this.setState({
      books: [...this.state.books, createdBookFromDB.data]
    })


    // OR this.getBooks()

  } catch (error) {
    console.log(error.message);
  }
}

/** Deleting a Book From the DB */

deleteBook = async (id) => {
  try {
    // TODO: build the url for axios 
    let url = `${process.env.REACT_APP_SERVER}/books/${id}`

    await axios.delete(url);

    // TODO: update state after book was deleted
    let updatedBooks = this.state.books.filter(book => book._id !== id);

    this.setState({
      books: updatedBooks
    })

  } catch (error) {
    console.log(error.message)
  }
}

/** Render function so that we can pass props/functions etc... to other components */

render(){
  return (
    <>
      <header>
        <h1>Canned Books</h1>
      </header>
      <main>
        {
          this.state.books.length > 0 &&
          <>
            <BestBooks
              books={this.state.books}
              deleteBook={this.deleteBook}
            />
          </>
        }
        <Container className="squareContainer">
          <Form onSubmit={this.handleBookSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control type="boolean" />
            </Form.Group>
            <Button type="submit">Add Book</Button>
          </Form>
        </Container>
      </main>
    </>
  );
}
}
export default App;