import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button, Form, FormGroup, Label, Input, Card } from "reactstrap";
import { useNavigate } from "react-router";

const api = "https://bookshelfapi-hapi.herokuapp.com/";
//const api = "http://localhost:5000/";
const MySwal = withReactContent(Swal);

//TODO FIX WHEN READING AND FINISHED TRUE

function UpdateBooksComponents() {
  let navigateTo = useNavigate();

  const [id, setID] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [bookYear, setBookYear] = useState(0);
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookSummary, setBookSummary] = useState("");
  const [bookPublisher, setBookPublisher] = useState("");
  const [bookPageCount, setBookPageCount] = useState(0);
  const [bookReadPage, setBookReadPage] = useState(0);
  const [bookReading, setBookReading] = useState(false);
  const [bookFinished, setbookFinished] = useState(null);

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setBookTitle(localStorage.getItem("Book-Title"));
    setBookYear(parseInt(localStorage.getItem("Book-Year")));
    setBookAuthor(localStorage.getItem("Book-Author"));
    setBookSummary(localStorage.getItem("Book-Summary"));
    setBookPublisher(localStorage.getItem("Book-Publisher"));
    setBookPageCount(parseInt(localStorage.getItem("Book-PageCount")));
    setBookReadPage(parseInt(localStorage.getItem("Book-ReadPage")));
    setBookReading(localStorage.getItem("Book-Reading") === "true");
    setbookFinished(localStorage.getItem("Book-Finished"));
  }, []);

  const updateData = (event) => {
    event.preventDefault();
    MySwal.fire({
      title: "Please Wait !",
      html: "Updating The Book", // add html attribute if you want or remove
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        MySwal.showLoading();
      },
    });
    axios
      .put(api + `books/${id}`, {
        name: bookTitle,
        year: bookYear,
        author: bookAuthor,
        summary: bookSummary,
        publisher: bookPublisher,
        pageCount: bookPageCount,
        readPage: bookReadPage,
        reading: bookReading,
        finished: bookFinished,
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
      .then((json) => {
        if (json.data.status === "success") {
          MySwal.fire({
            html: <i>{json.data.message}</i>,
            icon: "success",
          });
          navigateTo("/");
        }
      });
  };

  return (
    <div className="EditBookForms">
      <Card
        className="m-auto mt-3 mb-3"
        style={{
          width: "500px",
        }}
      >
        <h1 className="editbook-title m-auto mt-4">Edit Book</h1>
        <Form className="m-4">
          <FormGroup className="m-auto mb-3">
            <Label for="Book-Title">Title</Label>
            <Input
              id="Book-Title"
              name="name"
              placeholder="Enter the book title"
              onChange={(e) => setBookTitle(e.target.value)}
              value={bookTitle}
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
              value={bookYear}
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
              value={bookAuthor}
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
              value={bookSummary}
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
              value={bookPublisher}
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
              value={bookPageCount}
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
              value={bookReadPage}
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
          <div className="update-book_button-action m-auto">
            <Button
              className="m-auto me-5"
              color="primary"
              tag="input"
              type="submit"
              value="Submit"
              onClick={updateData}
            />
            <Button
              className="m-auto ms-5"
              color="primary"
              tag="input"
              type="submit"
              value="Back"
              onClick={() => navigateTo(-1)}
            />
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default UpdateBooksComponents;
