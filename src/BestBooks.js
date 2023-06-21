import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import {Container, Form, Button} from 'react-bootstrap';
import {Image} from 'react-bootstrap';

let bookImage = require('./book.jpg'); 

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }
  //looks for all our books data
  componentDidMount() {
    this.getAllBooks();
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getAllBooks = async () => {
    let url = `${process.env.REACT_APP_SERVER}/books`
    console.log('This is the URL', url);
    try {
      // todo: make a call to my server and hit my books endpoint

      let booksFromDB = await axios.get(url);
      console.log('This is books from BD', booksFromDB);
      // todo: save the response from my server to my state
      this.setState({
        books: booksFromDB.data
      })

    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>
            {this.state.books.map(book => (
              <Carousel.Item key={book._id}>
                {/* <Image src={bookImage} alt = 'Plain Book Cover'> </Image> */}
                <img className="d-block mx-auto"
                src={bookImage} 
                alt="Empty book cover" 
                height="600rem"/>
                {/* <div> */}
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>Author: {book.author}</p>
                <Button onClick={() => this.props.deleteBook(book._id)}>Delete Button</Button>
                </Carousel.Caption>
                {/* </div> */}
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