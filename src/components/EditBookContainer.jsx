import React from "react";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Form, FormGroup, Label, Input, Card } from "reactstrap";

const api = "https://bookshelfapi-hapi.herokuapp.com/";
//const api = "http://localhost:5000/";
const MySwal = withReactContent(Swal);

class EditBookContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.books[0].id,
      name: this.props.books[0].name,
      year: this.props.books[0].year,
      author: this.props.books[0].author,
      summary: this.props.books[0].summary,
      publisher: this.props.books[0].publisher,
      pageCount: this.props.books[0].pageCount,
      readPage: this.props.books[0].readPage,
      reading: (this.props.books[0].reading === "true"),
      finished: (this.props.books[0].finished === "true"),
      
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onChangeReadingStatus = this.onChangeReadingStatus.bind(this);

    this.onSubmitChangeEventHandler =
      this.onSubmitChangeEventHandler.bind(this);
  }

  onChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeReadingStatus() {
    this.setState(() => {
      return {
        reading: !this.state.reading,
      };
    });
  }

  onSubmitChangeEventHandler(event) {
    event.preventDefault();
    axios
      .put(api + `books/${this.state.id}`, {
        id: this.state.id,
        name: this.state.name,
        year: this.state.year,
        author: this.state.author,
        summary: this.state.summary,
        publisher: this.state.publisher,
        pageCount: this.state.pageCount,
        readPage: this.state.readPage,
        reading: this.state.reading,
        finished: this.state.finished,
      })
      .then((json) => {
        if (json.data.status === "success") {
          MySwal.fire({
            html: <i>{json.data.message}</i>,
            icon: "success",
          });
        } else {
          MySwal.fire({
            html: <i>{json.data.message}</i>,
            icon: "error",
          });
        }
      });
  }

  render() {
    return (
      <div>
        <Card
          className="m-auto mt-3 mb-3"
          style={{
            width: "500px",
          }}
        >
          <Form onSubmit={this.onSubmitChangeEventHandler} className="m-5">
            <FormGroup className="m-auto mb-3">
              <Label for="Book-Title">Book Title</Label>
              <Input
                id="Book-Title"
                name="name"
                placeholder="Book Title"
                onChange={this.onChangeHandler}
                value={this.state.name}
              />
            </FormGroup>
            <FormGroup className="m-auto mb-3">
              <Label for="Book-Year">Book Year</Label>
              <Input
                id="Book-Year"
                name="year"
                placeholder="Book Year"
                type="text"
                onChange={this.onChangeHandler}
                value={this.state.year}
              />
            </FormGroup>
            <FormGroup className="m-auto mb-3">
              <Label for="Book-Author">Book Author</Label>
              <Input
                id="Book-Author"
                name="author"
                placeholder="Book Author"
                type="text"
                onChange={this.onChangeHandler}
                value={this.state.author}
              />
            </FormGroup>
            <FormGroup className="m-auto mb-3">
              <Label for="Book-Summary">Book Summary</Label>
              <Input
                id="Book-Summary"
                name="summary"
                placeholder="Book Summary"
                type="text"
                onChange={this.onChangeHandler}
                value={this.state.summary}
              />
            </FormGroup>
            <FormGroup className="m-auto mb-3">
              <Label for="Book-Publisher">Book Publisher</Label>
              <Input
                id="Book-Publisher"
                name="publisher"
                placeholder="Book Publisher"
                type="text"
                onChange={this.onChangeHandler}
                value={this.state.publisher}
              />
            </FormGroup>
            <FormGroup className="m-auto mb-3">
              <Label for="Book-pageCount">Book Total Page</Label>
              <Input
                id="Book-pageCount"
                name="pageCount"
                placeholder="Book pageCount"
                type="number"
                onChange={this.onChangeHandler}
                value={this.state.pageCount}
              />
            </FormGroup>
            <FormGroup className="m-auto mb-3">
              <Label for="Book-readPage">Book Total Readed Page</Label>
              <Input
                id="Book-readPage"
                name="readPage"
                placeholder="Book readPage"
                type="number"
                onChange={this.onChangeHandler}
                value={this.state.readPage}
              />
            </FormGroup>
            <FormGroup switch className="m-auto mb-3">
              <Input
                type="switch"
                role="switch"
                checked={this.state.reading}
                onChange={this.onChangeReadingStatus}
                value={this.state.reading}
              />
              <Label check>Reading ?</Label>
            </FormGroup>
            <Button color="primary" tag="input" type="submit" value="Submit" />
          </Form>
        </Card>
      </div>
    );
  }
}

export default EditBookContainer;
