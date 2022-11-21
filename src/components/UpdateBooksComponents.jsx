import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button, Form, FormGroup, Label, Input, Card } from "reactstrap";
import { useNavigate } from "react-router";

//const api = "https://bookshelfapi-hapi.herokuapp.com/";
const api = "http://localhost:5000/";
const MySwal = withReactContent(Swal);

function UpdateBooksComponents() {
  let navigateTo = useNavigate();

  const [id, setID] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [bookYear, setBookYear] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookSummary, setBookSummary] = useState("");
  const [bookPublisher, setBookPublisher] = useState("");
  const [bookPageCount, setBookPageCount] = useState("");
  const [bookReadPage, setBookReadPage] = useState("");
  const [bookReading, setBookReading] = useState(false);
  const [bookFinished, setbookFinished] = useState(null);

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setBookTitle(localStorage.getItem("Book-Title"));
    setBookYear(localStorage.getItem("Book-Year"));
    setBookAuthor(localStorage.getItem("Book-Author"));
    setBookSummary(localStorage.getItem("Book-Summary"));
    setBookPublisher(localStorage.getItem("Book-Publisher"));
    setBookPageCount(localStorage.getItem("Book-PageCount"));
    setBookReadPage(localStorage.getItem("Book-ReadPage"));
    setBookReading(localStorage.getItem("Book-Reading"));
    setbookFinished(localStorage.getItem("Book-Finished"));
  }, []);

  const updateData = (event) => {
    event.preventDefault();
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
        finished: bookFinished === "true",
      })
      .then((json) => {
        if (json.data.status === "success") {
          MySwal.fire({
            html: <i>{json.data.message}</i>,
            icon: "success",
          });
          navigateTo("/Booklist");
        } else {
          MySwal.fire({
            html: <i>{json.data.message}</i>,
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="BookShelfApp">
      <Card
        className="m-auto mt-3 mb-3"
        style={{
          width: "500px",
        }}
      >
        <Form className="m-5">
          <FormGroup className="m-auto mb-3">
            <Label for="Book-Title">Book Title</Label>
            <Input
              id="Book-Title"
              name="name"
              placeholder="Book Title"
              onChange={(e) => setBookTitle(e.target.value)}
              value={bookTitle}
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
              value={bookYear}
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
              value={bookAuthor}
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
              value={bookSummary}
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
              value={bookPublisher}
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
              value={bookPageCount}
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
              value={bookReadPage}
            />
          </FormGroup>
          <FormGroup switch className="m-auto mb-3">
            <Input
              type="switch"
              role="switch"
              checked={bookReading === "true"}
              onChange={(e) => setBookReading(!bookReading)}
              value={bookReading}
            />
            <Label check>Reading ?</Label>
          </FormGroup>
          <Button
            color="primary"
            tag="input"
            type="submit"
            value="Update"
            onClick={updateData}
          />
        </Form>
      </Card>
    </div>
  );
}

export default UpdateBooksComponents;
