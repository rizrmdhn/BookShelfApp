import axios from "axios";
import React from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Form, FormGroup, Label, Input, Card } from "reactstrap";

const api = "https://bookshelfapi-hapi.herokuapp.com/";
//const api = "http://localhost:5000/";
const MySwal = withReactContent(Swal);

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

    this.onChangeReadingStatus = this.onChangeReadingStatus.bind(this);

    this.onSubmitChangeEventHandler =
      this.onSubmitChangeEventHandler.bind(this);
  }

  onChangeHandler = (event) => {
    this.setState({[event.target.name] : event.target.value});
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
        if (json.data.status === 'success') {
          MySwal.fire({
            title: this.state.name,
            html: <i>Berhasil ditambahkan</i>,
            icon: "success",
          })
        } else {
          MySwal.fire({
            title: this.state.name,
            html: <i>Gagal ditambahkan</i>,
            icon: "error",
          })
        }
      });
  }

  render() {
    return (
      <div className="BookShelfApp">
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

export default BookShelfApp;
