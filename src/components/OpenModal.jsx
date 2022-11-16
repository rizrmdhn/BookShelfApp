import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

function OpenModal({ args }) {
  const [modal, setModal] = useState(false);
  const [state, setState] = useState(true);
  const [
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    onSubmit,
    ,
    setMessage,
  ] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  reading = state;

  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Click Me
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="Book-Title">Book Title</Label>
              <Input
                id="Book-Title"
                name="Book-Title"
                placeholder="Book Title"
                onChange={handleChange}
                value={name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Book-Year">Book Year</Label>
              <Input
                id="Book-Year"
                name="Book-Year"
                placeholder="Book Year"
                type="text"
                onChange={handleChange}
                value={year}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Book-Author">Book Author</Label>
              <Input
                id="Book-Author"
                name="Book-Author"
                placeholder="Book Author"
                type="text"
                onChange={handleChange}
                value={author}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Book-Summary">Book Summary</Label>
              <Input
                id="Book-Summary"
                name="Book-Summary"
                placeholder="Book Summary"
                type="text"
                onChange={handleChange}
                value={summary}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Book-Publisher">Book Publisher</Label>
              <Input
                id="Book-Publisher"
                name="Book-Publisher"
                placeholder="Book Publisher"
                type="text"
                onChange={handleChange}
                value={publisher}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Book-pageCount">Book Total Page</Label>
              <Input
                id="Book-pageCount"
                name="Book-pageCount"
                placeholder="Book pageCount"
                type="number"
                onChange={handleChange}
                value={pageCount}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Book-readPage">Book Total Readed Page</Label>
              <Input
                id="Book-readPage"
                name="Book-readPage"
                placeholder="Book readPage"
                type="number"
                onChange={handleChange}
                value={readPage}
              />
            </FormGroup>
            <FormGroup switch>
              <Input
                type="switch"
                checked={state}
                onClick={() => {
                  setState(!state);
                }}
              />
              <Label check>Done Reading ?</Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary" onClick={toggle}>
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default OpenModal;
