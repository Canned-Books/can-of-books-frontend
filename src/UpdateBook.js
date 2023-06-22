import React from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

class UpdateBook extends React.Component{
  

    handleBookUpdate = (event) => {
        event.preventDefault();
        let bookObj = {
            title: event.target.title.value,
            author: event.target.author.value,
            description: event.target.description.value,
            status: event.target.status.checked,
            //imageUrl: event.target.imageUrl.value,
            _id: this.props.bookToUpdate._id,
            __v: this.props.bookToUpdate.__v
        }
        console.log(bookObj);
        this.updateBook (bookObj);
    }
    updateBook = async (bookObj) => {
        try {
            let url = `${process.env.REACT_APP_SERVER}/books/${bookObj._id}`;
            let updatedBook = await axios.put(url, bookObj);
            console.log(updatedBook.data);
        }
        catch (error) {
            console.log(error.message);
        }
        this.props.getAllBooks();
        this.props.closeUpdateModal();
    }

    render (){
        return (
            <>         
        
                <Modal show={this.props.showModal} onHide={this.props.closeUpdateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Book Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="mt-5">
                        <Form onSubmit={this.handleBookUpdate}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control defaultValue={this.props.bookToUpdate.title} type="text" />
                        </Form.Group>
                        <Form.Group controlId="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control defaultValue={this.props.bookToUpdate.author} type="text" />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control defaultValue={this.props.bookToUpdate.description} type="text" />
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control defaultValue={this.props.bookToUpdate.status} type="boolean" />
                        </Form.Group>                        
                        <Button type="submit">Submit</Button>
                        </Form>
                    </Container>
                </Modal.Body>             
                </Modal>
            </>
        );
    }
}

export default UpdateBook;