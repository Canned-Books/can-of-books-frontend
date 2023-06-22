import React from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

class AddBook extends React.Component{
  

    handleBookSubmit = (event) => {
        event.preventDefault();
        let bookObj = {
            title: event.target.title.value,
            description: event.target.description.value,
            status: event.target.status.value,
            imageUrl: event.target.imageUrl.checked
        }
        console.log(bookObj);
        this.postBook (bookObj);
    }
    postBook = async (bookObj) => {
        try {
            let url = `${process.env.REACT_APP_SERVER}/books`;
            let createdBook = await axios.post(url, bookObj);
            console.log(createdBook.data);
        }
        catch (error) {
            console.log(error.message);
        }
        this.props.getAllBooks();
    }

    render (){
        return (
            <>         
        
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add A Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="mt-5">
                        <Form onSubmit={this.handleBookSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Label>Status(available or unavailable)</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="imageUrl">
                            <Form.Label>ImageUrl</Form.Label>
                            <Form.Control type="text" />
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

export default AddBook;