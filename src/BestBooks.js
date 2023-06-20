import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

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
  getAllBooks = () => {
    try {
      // Make a call to my server and hit my books endpoint
      // http://localhost:3001/books
      let url = `${process.env.React_APP_SERVER}/books`

      let booksFromDB = await axios.get(url);
      // Save the response from my server to state
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
                <div>
                  <h3>{book.title}</h3>
                  <p>Author: {book.author}</p>
                </div>
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