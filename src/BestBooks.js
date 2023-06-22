import React from 'react';
import axios from 'axios';
import './BestBooks.css';
import AddBook from './addBook';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import UpdateBook from './UpdateBook'

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      showUpdateModal: false,
      bookToUpdate: {}
    }
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true
    })
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    })
  }

  handleOpenUpdateModal = (bookToUpdate) => {
    this.setState({
      showUpdateModal: true,
      bookToUpdate: bookToUpdate
    })
  }

  handleCloseUpdateModal = () => {
    this.setState({
      showUpdateModal: false,
      bookToUpdate:{}
    })
  }

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

  componentDidMount(){
    this.getAllBooks();
  }

  deleteBook = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`;
      await axios.delete(url);

      let updatedBooks = this.state.books.filter(book => book._id !== id);

      this.setState({
        books: updatedBooks
      })
      
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        <Button variant = 'primary' onClick = {this.handleOpenModal}>Add A Book</Button>

        <AddBook getAllBooks = {this.getAllBooks} show = {this.state.showModal} handleClose = {this.handleCloseModal}/>
        <UpdateBook getAllBooks={this.getAllBooks} showModal={this.state.showUpdateModal} closeUpdateModal={this.handleCloseUpdateModal} bookToUpdate={this.state.bookToUpdate}/>

        {this.state.books.length ? (
          <>
          <div className="carousel-container">
            <div className="carousel-wrapper">
              <Carousel>
            {this.state.books.map( (book)=>(
              <Carousel.Item key={book._id}>
                <img className="d-block w-50" src={book.imageUrl || 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60'} alt={book.title} />
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>Description: {book.description} <br />
                  Status: {book.status}</p>
                  <Button variant="danger" onClick={()=> this.deleteBook(book._id)}>Delete Book</Button>
                  <Button variant="success" onClick={()=> this.handleOpenUpdateModal(book)}>Update Book</Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
            </div>
          </div>
          </>
            ) : (
          <h3>No Books Found</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
