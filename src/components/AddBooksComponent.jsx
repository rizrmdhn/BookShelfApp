import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
} from "reactstrap";
import BookListComponents from "./BookListComponents";

const api = "https://bookshelfapi-hapi.herokuapp.com/";
//const api = "http://localhost:5000/";
const MySwal = withReactContent(Swal);

function AddBooksComponent() {

  const [bookTitle, setBookTitle] = useState("");
  const [bookYear, setBookYear] = useState(0);
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookSummary, setBookSummary] = useState("");
  const [bookPublisher, setBookPublisher] = useState("");
  const [bookPageCount, setBookPageCount] = useState(0);
  const [bookReadPage, setBookReadPage] = useState(0);
  const [bookReading, setBookReading] = useState(false);

  const postData = (event) => {
    event.preventDefault();
    MySwal.fire({
      title: "Please Wait !",
      html: "Adding To Book", // add html attribute if you want or remove
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        MySwal.showLoading();
      },
    });
    axios
      .post(api + "books", {
        name: bookTitle,
        year: parseInt(bookYear),
        author: bookAuthor,
        summary: bookSummary,
        publisher: bookPublisher,
        pageCount: parseInt(bookPageCount),
        readPage: parseInt(bookReadPage),
        reading: bookReading,
      })
      .catch(function (error) {
        if (error.response) {
          MySwal.fire({
            icon: "error",
            title: "Fail",
            text: error.response.data.message,
          });
        }
      })
      .then((res) => {
        if (res.data.status === "success") {
          MySwal.fire({
            title: bookTitle,
            html: <i>Berhasil ditambahkan</i>,
            icon: "success",
          }).then((result) => {
            if(result.isConfirmed) {
              window.location.reload(false);
            }
          })
        }
      });
  };

  return (
    <>
      <div className="BookShelfApp container-fluid">
        <Card className="Bookshelf-card container-fluid">
          <h1 className="bookshelf-title m-auto mt-4">Add Book</h1>
          <Form className="m-4">
            <FormGroup className="m-auto mb-3">
              <Label for="Book-Title">Title</Label>
              <Input
                id="Book-Title"
                name="name"
                placeholder="Enter the book title"
                onChange={(e) => setBookTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="m-auto mb-3">
              <Label for="Book-Year">Year Release</Label>
              <Input
                id="Book-Year"
                name="year"
                placeholder="Enter the book year release"
                type="text"
                onChange={(e) => setBookYear(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="m-auto mb-3">
              <Label for="Book-Author">Author</Label>
              <Input
                id="Book-Author"
                name="author"
                placeholder="Enter the book author"
                type="text"
                onChange={(e) => setBookAuthor(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="m-auto mb-3">
              <Label for="Book-Summary">Summary</Label>
              <Input
                id="Book-Summary"
                name="summary"
                placeholder="Enter the book summary"
                type="text"
                onChange={(e) => setBookSummary(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="m-auto mb-3">
              <Label for="Book-Publisher">Publisher</Label>
              <Input
                id="Book-Publisher"
                name="publisher"
                placeholder="Enter the book publisher"
                type="text"
                onChange={(e) => setBookPublisher(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="m-auto mb-3">
              <Label for="Book-pageCount">Total Page</Label>
              <Input
                id="Book-pageCount"
                name="pageCount"
                placeholder="Enter the total book page"
                type="number"
                onChange={(e) => setBookPageCount(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="m-auto mb-3">
              <Label for="Book-readPage">Readed Page</Label>
              <Input
                id="Book-readPage"
                name="readPage"
                placeholder="Enter the number readed page"
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
                value={bookReading}
              />
              <Label check>Reading the book ?</Label>
            </FormGroup>
            <Button
              className="m-auto"
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
