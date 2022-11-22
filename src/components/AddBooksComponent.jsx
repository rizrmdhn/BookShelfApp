import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button, Form, FormGroup, Label, Input, Card, CardText, CardHeader } from "reactstrap";
import { useNavigate } from 'react-router';
import BookListComponents from "./BookListComponents";


const api = "https://bookshelfapi-hapi.herokuapp.com/";
//const api = "http://localhost:5000/";
const MySwal = withReactContent(Swal);

function AddBooksComponent() {
  let navigateTo = useNavigate();

  const [bookTitle, setBookTitle] = useState("");
  const [bookYear, setBookYear] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookSummary, setBookSummary] = useState("");
  const [bookPublisher, setBookPublisher] = useState("");
  const [bookPageCount, setBookPageCount] = useState("");
  const [bookReadPage, setBookReadPage] = useState("");
  const [bookReading, setBookReading] = useState(false);

  const postData = (event) => {
    event.preventDefault();
    axios
      .post(api + "books", {
        name: bookTitle,
        year: bookYear,
        author: bookAuthor,
        summary: bookSummary,
        publisher: bookPublisher,
        pageCount: bookPageCount,
        readPage: bookReadPage,
        reading: bookReading,
      })
      .then((res) => {
        if (res.data.status === "success") {
          MySwal.fire({
            title: bookTitle,
            html: <i>Berhasil ditambahkan</i>,
            icon: "success",
          });
          navigateTo('/');
        } else {
          MySwal.fire({
            title: bookTitle,
            html: <i>Gagal ditambahkan</i>,
            icon: "error",
          });
        }
      });
  };

  return (
    <>
    <div className="BookShelfApp container-fluid">
      <Card
        className="Bookshelf-card container-fluid"
      >
        <h1 className="bookshelf-title ms-4 mt-4">Add your book</h1>
        <Form className="m-4">
          <FormGroup className="m-auto mb-3">
            <Label for="Book-Title">Book Title</Label>
            <Input
              id="Book-Title"
              name="name"
              placeholder="Book Title"
              onChange={(e) => setBookTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="m-auto mb-3">
            <Label for="Book-Year">Book Year</Label>
            <Input
              id="Book-Year"
              name="year"
              placeholder="Book Year"
              type="text"
              onChange={(e) => setBookYear(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="m-auto mb-3">
            <Label for="Book-Author">Book Author</Label>
            <Input
              id="Book-Author"
              name="author"
              placeholder="Book Author"
              type="text"
              onChange={(e) => setBookAuthor(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="m-auto mb-3">
            <Label for="Book-Summary">Book Summary</Label>
            <Input
              id="Book-Summary"
              name="summary"
              placeholder="Book Summary"
              type="text"
              onChange={(e) => setBookSummary(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="m-auto mb-3">
            <Label for="Book-Publisher">Book Publisher</Label>
            <Input
              id="Book-Publisher"
              name="publisher"
              placeholder="Book Publisher"
              type="text"
              onChange={(e) => setBookPublisher(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="m-auto mb-3">
            <Label for="Book-pageCount">Book Total Page</Label>
            <Input
              id="Book-pageCount"
              name="pageCount"
              placeholder="Book pageCount"
              type="number"
              onChange={(e) => setBookPageCount(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="m-auto mb-3">
            <Label for="Book-readPage">Book Total Readed Page</Label>
            <Input
              id="Book-readPage"
              name="readPage"
              placeholder="Book readPage"
              type="number"
              onChange={(e) => setBookReadPage(e.target.value)}
            />
          </FormGroup>
          <FormGroup switch className="m-auto mb-3">
            <Input
              type="switch"
              role="switch"
              checked={bookReading}
              onChange={(e) => setBookReading(!bookReading)}
            />
            <Label check>Reading ?</Label>
          </FormGroup>
          <Button
            color="primary"
            tag="input"
            type="submit"
            value="Submit"
            onClick={postData}
          />
        </Form>
      </Card>
      <BookListComponents />
    </div>
    </>
  );
}

export default AddBooksComponent;
