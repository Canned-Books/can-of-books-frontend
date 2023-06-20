import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
    }
  }

  //To do Handler to get all books
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

  componentDidMount() {
    this.getAllBooks();
  }

  render(){
    return (
      <>
        <header>
          <h1>Awesome Sauce Books</h1>
        </header>
        <main>
          {
            this.state.books.length > 0 &&
            <>
              {this.state.books.map(book => {
                return <p key={book._id}>{book.name} is a {book.description}</p>
              })}
            </>
          }
        </main>
      </>
    );
  }
}
export default App;
