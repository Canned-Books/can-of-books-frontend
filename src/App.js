/************************** Import Section */
import React from 'react';                                  /***** Using React */
import './css/App.css';                                         /***** CSS File for App.js */
import axios from 'axios';                                  /***** axios HTTP Client Library. Allows requests to an endpoint */
import BestBooks from './BestBooks';                        /***** Connects our local BestBooks Component File */
import { Container, Form, Button } from 'react-bootstrap';  /***** Imports react-bootstrap CSS for: Container/Form/Button */
import 'bootstrap/dist/css/bootstrap.min.css';              /***** Imports compiled CSS of Webpack 3 */

import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'; /***** React Router */
import Header from './Header';                              /***** Imports our local Header componenet */
import Footer from './Footer';                              /***** Imports our local Footer componenet */
import About from './About';                                /***** Imports our local About componenet */

/** ES6 Class Component Definition::class App refrening the App component (App.js) */
class App extends React.Component {
  constructor(props){     /** Constructor::method that initializes Objects State in Class  */
    super(props);         /** method::called due to constructor implementation, allows this.props */
    this.state = {        /** assigns the initial state in the constructor (local state) // Only used by constructor */    
      books: [],          /** initial value*/
    }
  }

/******************** Handler:Get books from Backend ********************/
/** Arrow function: getAllBooks */
getAllBooks = async () => {                           /*** asynchronous function using async & await */
  try {                                               /*** program attempts fetching with axios library */
    let url = `${process.env.REACT_APP_SERVER}/books` /*** this url references our .env file preset server port */

    let booksFromDB = await axios.get(url);           /*** axios.get function makes GET rqst to the server & returns a promise (asynchronous) */
                    /**await keyword pauses the execution of the function until the promise from GET is resolved */
    this.setState({                 /*** setState is updating our component (like a quicksave for App.js) */
      books: booksFromDB.data       /*** Once resolved the data containing the books is stored in booksFromDB */
    })
  } catch (error) {                 /** if our try fails, we then... */
    console.log(error.message);     /** print out an error */
  }
}
/****** componentDidMount: lifecycle method that is called after a component is mounted */
componentDidMount() {     /** automatically invoked upon a component mounting */
  this.getAllBooks();     /** this fetches all the books inside of the component that are now mounted */
}         /** This ensures books are fetched from the server and the component's state is updated and ready to display */

/********************************* Adding Book to DB: Using 2 Handlers *******************************/
  /*** Handler #1: handleBookSubmit::Gathers information from the form */
handleBookSubmit = (event) => {       /** this function is triggered when a form is submitted (event) */
  event.preventDefault();             /** this call prevents the default form submission behavior which cause page refresh */
  /*** Building a bookObj representing the book being entered into the DB */
  let bookObj = {     /** This object accesses the values: title, description, author, and status */
    title: event.target.title.value,
    description: event.target.description.value,
    author: event.target.author.value,   /** The "+" is used to convert the value into an integer */
    status: event.target.status.value
  }

  this.postBook(bookObj);   /** Passing the object to the second handler */
}
  /*** Handler #2: postBook - sends an HTTP POST request to add the book to DB */
postBook = async (bookObj) => {   /** Asynchornous function using async & await // bookObj passed as parameter */
  try {                           /** Function attempts to send HTTP POST  */
    let url = `${process.env.REACT_APP_SERVER}/books`;    /** POST rqst constructed form SERVER env variable from .env file */
    /** axios used to make the POST rqst */
    let createdBookFromDB = await axios.post(url, bookObj);       /** 1st argument: URL, 2nd argument: bookObj */
          /** The response from the server containing the created book is stored as createdBookFromDB */
   
    this.setState({                                         /** Adds the new createdBookFromDB to the books array */
      books: [...this.state.books, createdBookFromDB.data]  /** spread operator: used to create a new array that includes the existing books in the state */
    })            /** the new array includes existing books in the state (this.state.books) and the new (createdBookFromDB) */

  } catch (error) {               /** Handles Errors */
    console.log(error.message);   /** Console.log's them */
  }
}   /** handleBookSubmtit has taken from data and made object, postBook has added that to the DB */

/****************************************** Deleting a Book From the DB **********************************************/
  /** Handler function to delete a book */
deleteBook = async (id) => {                      /** Asynchronous funciton using async & await */
  try {                                           /** function tries to delete a book from the server */
    let url = `${process.env.REACT_APP_SERVER}/books/${id}` /** .env address to the SERVER */
                                            /** The book's {id} is used for selection */
    await axios.delete(url);    /** Function called to make a DELETE rqst to the constructed url // await:execution pauses */

    let updatedBooks = this.state.books.filter(book => book._id !== id);      /** Update component state */
                              /** Filters existing books array (this.state.books) */
    this.setState({           /** creates a new array (updatedBooks) */
      books: updatedBooks     /** Updates state with the new books */
    })

  } catch (error) {             /** Error handling */
    console.log(error.message)  /** Error logging */
  }       /** book has been deleted from the database sending a DELETE rqst to the server and state updated*/
}
/*********************** RENDER method (required method in a React component) *************************/
render(){
  return (          /** returns JSX (JavaScript XML) representing component UI */
    /** The returned JSX is wrapped in epty tags to create a fragment, allowing multiple
     * adjacent elements without adding an extra DOM node */    
    <>        
      {/* This renders a header element */} 
      <header>                                               
        <h1>Canned Books</h1>
      </header>
       {/* This renders a header element */} 
      <main>                                       
        {       
          this.state.books.length > 0 &&            
          <>
          {/** Conditional render of BestBooks only if they are in state */}
          {/**BestBooks component passed in two props: books & deleteBook */}
            <BestBooks
              books={this.state.books}
              deleteBook={this.deleteBook}
            />
          </>
        }
        {/**Container component rendered */}
        <Container className="squareContainer">
          {/**Form is rendered in the container */}
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
            {/** This button is set to the type:submit. This triggers the handleBookSubmit */}
            <Button type="submit">Add Book</Button>
          </Form>
        </Container>
      </main>
    </>
  );
}
}
export default App;