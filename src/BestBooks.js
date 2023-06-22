/** Import section */
import React from 'react';                        /***** Using React */
import axios from 'axios';                        /***** axios HTTP Client Library. Allows requests to an endpoint */
import Carousel from 'react-bootstrap/Carousel';  /***** Imports the Carousel css from react-bootstrap */
import { Container, Form, Button, Image } from 'react-bootstrap';
import bookImage from './img/book.jpg';

/************* ES6 Class Component BestBooks component defined as class and extends React.Component */
class BestBooks extends React.Component {
  constructor(props) {      /** Constructor::method that initializes Objects State in Class  */
    super(props);           /** method::called due to constructor implementation, allows this.props */
   
   
//    this.state = {          /** assigns the initial state in the constructor (local state) // Only used by constructor */ 
//      books: []             /** initial value*/
//    }
  }
      //
      //
      ///****** componentDidMount: lifecycle method that is called after a component is mounted */
      //  componentDidMount() {     /** automatically invoked upon a component mounting */
      //    this.getAllBooks();     /** this fetches all the books inside of the component that are now mounted */
      //  }       /** This ensures books are fetched from the server and the component's state is updated and ready to display */
      //
      ///********************* Handler: Get books from the DB ********************/
      //  getAllBooks = async () => {                           /** asynchronous */
      //    let url = `${process.env.REACT_APP_SERVER}/books`   /** server via .env file */
      //    console.log('This is the URL', url);                /** console log because...? */
      //    try {                                               /** function attempts to...: */
      //          /** Send a GET Request to constructed URL and retrieve Books */
      //      let booksFromDB = await axios.get(url);   /** Stores books we receive into booksFromDB */
      //      console.log('These are the books from the DB', booksFromDB);
      //      this.setState({             /** "quicksave" */
      //        books: booksFromDB.data   /** data is assigned the books property */
      //      })
          //
      //    } catch (error) {             /** Error handling */
      //      console.log(error.message); /** Error printing */
      //      }
      //  }
      ///** RENDER method (required method in a React componenet) */
  
    render() {
    return (      /** returns JSX (JavaScript XML) representing component UI */
    /** The returned JSX is wrapped in epty tags to create a fragment, allowing multiple
     * adjacent elements without adding an extra DOM node */  
      <>
        {/** Heading to the component */}
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        {/** Conditional rendering, either a carousel of books or message of book collection empty */}
        {this.props.books.length ? (
          <Carousel>
            {/** map method iterates over the books array and creates a Carousel.Item for each book */}
            {this.props.books.map(book => (
              <Carousel.Item key={book._id}>
                <img className='d-block mx-auto' src={bookImage} alt="book" height="600rem"/>
                {/** the key select the book id# to uniquely identify the object */}
                <Carousel.Caption>
                  {/** div is rendered containing the book title and author */}
                  <h3>{book.title}</h3>
                  <p>Author: {book.author}</p>
                <Button onClick={() => this.props.deleteBook(book._id)}>Delete Book</Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <h3>Book Collection is Empty</h3>
        )}
      </>
    )
  }
}

export default BestBooks;