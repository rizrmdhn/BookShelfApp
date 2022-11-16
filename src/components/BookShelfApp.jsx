import axios from "axios";
import React from "react";
import { nanoid } from "nanoid";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const api = "http://localhost:5000/";

class BookShelfApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      year: "",
      author: "",
      summary: "",
      publisher: "",
      pageCount: "",
      readPage: "",
      response: "",
      reading: false,
    };

    this.onBookTitleChangeHandler = this.onBookTitleChangeHandler.bind(this);
    this.onBookYearChangeHandler = this.onBookYearChangeHandler.bind(this);
    this.onBookAuthorChangeHandler = this.onBookAuthorChangeHandler.bind(this);
    this.onBookSummaryChangeHandler =
      this.onBookSummaryChangeHandler.bind(this);
    this.onBookPublisherChangeHandler =
      this.onBookPublisherChangeHandler.bind(this);
    this.onBookPageCountChangeHandler =
      this.onBookPageCountChangeHandler.bind(this);
    this.onBookReadPageChangeHandler =
      this.onBookReadPageChangeHandler.bind(this);
    this.onChangeReadingStatus = this.onChangeReadingStatus.bind(this);
    
    this.onSubmitChangeEventHandler =
      this.onSubmitChangeEventHandler.bind(this);
  }

  onBookTitleChangeHandler(event) {
    this.setState(() => {
      return {
        name: event.target.value,
      };
    });
  }

  onBookYearChangeHandler(event) {
    this.setState(() => {
      return {
        year: event.target.value,
      };
    });
  }

  onBookAuthorChangeHandler(event) {
    this.setState(() => {
      return {
        author: event.target.value,
      };
    });
  }

  onBookSummaryChangeHandler(event) {
    this.setState(() => {
      return {
        summary: event.target.value,
      };
    });
  }

  onBookPublisherChangeHandler(event) {
    this.setState(() => {
      return {
        publisher: event.target.value,
      };
    });
  }

  onBookPageCountChangeHandler(event) {
    this.setState(() => {
      return {
        pageCount: event.target.value,
      };
    });
  }

  onBookReadPageChangeHandler(event) {
    this.setState(() => {
      return {
        readPage: event.target.value,
      };
    });
  }

  onChangeReadingStatus() {
    this.setState(() => {
      return {
        reading: !this.state.reading,
      };
    });
  }

  onSubmitChangeEventHandler(event) {
    event.preventDefault();
    this.props.addbook(this.state);

    axios
      .post(api + "books", {
        name: this.state.name,
        year: this.state.year,
        author: this.state.author,
        summary: this.state.summary,
        publisher: this.state.publisher,
        pageCount: this.state.pageCount,
        readPage: this.state.readPage,
        reading: this.state.reading,
      })
      .then((json) => {
        if (json.data.status === 200) {
          this.setState({
            response: json.data.books,
          });
        } else {
          this.setState({
            response: json.data.books,
          });
        }
        console.log(this.state, "<== from booshelfapp");
      });
  }

  render() {
    return (
      <div className="BookShelfApp">
        <Form onSubmit={this.onSubmitChangeEventHandler}>
          <FormGroup>
            <Label for="Book-Title">Book Title</Label>
            <Input
              id="Book-Title"
              name="Book-Title"
              placeholder="Book Title"
              onChange={this.onBookTitleChangeHandler}
              value={this.state.name}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Book-Year">Book Year</Label>
            <Input
              id="Book-Year"
              name="Book-Year"
              placeholder="Book Year"
              type="text"
              onChange={this.onBookYearChangeHandler}
              value={this.state.year}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Book-Author">Book Author</Label>
            <Input
              id="Book-Author"
              name="Book-Author"
              placeholder="Book Author"
              type="text"
              onChange={this.onBookAuthorChangeHandler}
              value={this.state.author}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Book-Summary">Book Summary</Label>
            <Input
              id="Book-Summary"
              name="Book-Summary"
              placeholder="Book Summary"
              type="text"
              onChange={this.onBookSummaryChangeHandler}
              value={this.state.summary}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Book-Publisher">Book Publisher</Label>
            <Input
              id="Book-Publisher"
              name="Book-Publisher"
              placeholder="Book Publisher"
              type="text"
              onChange={this.onBookPublisherChangeHandler}
              value={this.state.publisher}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Book-pageCount">Book Total Page</Label>
            <Input
              id="Book-pageCount"
              name="Book-pageCount"
              placeholder="Book pageCount"
              type="number"
              onChange={this.onBookPageCountChangeHandler}
              value={this.state.pageCount}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Book-readPage">Book Total Readed Page</Label>
            <Input
              id="Book-readPage"
              name="Book-readPage"
              placeholder="Book readPage"
              type="number"
              onChange={this.onBookReadPageChangeHandler}
              value={this.state.readPage}
            />
          </FormGroup>
          <FormGroup switch>
            <Input
              type="switch"
              role="switch"
              onChange={this.onChangeReadingStatus}
              value={this.state.reading}
            />
            <Label check>Reading ?</Label>
          </FormGroup>
          <Button color="primary" tag="input" type="submit" value="Submit" />
        </Form>
      </div>
    );
  }
}

export default BookShelfApp;
