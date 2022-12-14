import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardGroup,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const api = "https://bookshelfapi-hapi.herokuapp.com/";
//const api = "http://localhost:5000/";
const MySwal = withReactContent(Swal);

function FinishedBookComponent() {
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios.get(api + "books?finished=1").then((res) => {
      const bookdata = res.data.data.books;
      setAPIData(bookdata);
    });
  }, []);

  const setData = (books) => {
    let {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
    } = books;
    localStorage.setItem("ID", id);
    localStorage.setItem("Book-Title", name);
    localStorage.setItem("Book-Year", year);
    localStorage.setItem("Book-Author", author);
    localStorage.setItem("Book-Summary", summary);
    localStorage.setItem("Book-Publisher", publisher);
    localStorage.setItem("Book-PageCount", pageCount);
    localStorage.setItem("Book-ReadPage", readPage);
    localStorage.setItem("Book-Reading", reading);
    localStorage.setItem("Book-Finished", finished);
  };

  const getData = () => {
    axios.get(api + "books?finished=1").then((getData) => {
      const bookdata = getData.data.data.books;
      setAPIData(bookdata);
    });
  };

  const onFinished = async (id) => {
    MySwal.fire({
      title: "Please Wait !",
      html: "Adding To Finished List", // add html attribute if you want or remove
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        MySwal.showLoading();
      },
    });
    const datas = await axios
      .get(api + `books/${id}`)
      .then((res) => res.data.data.book);
    axios
      .put(api + `books/${id}`, {
        id: datas.id,
        name: datas.name,
        year: datas.year,
        author: datas.author,
        summary: datas.summary,
        publisher: datas.publisher,
        pageCount: datas.pageCount,
        readPage: datas.pageCount,
        reading: false,
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
            html: <i>Berhasil ditambahkan ke daftar selesai dibaca</i>,
            icon: "success",
          });
          getData();
        }
      });
  };

  const onRead = async (id) => {
    MySwal.fire({
      title: "Please Wait !",
      html: "Adding To Read List", // add html attribute if you want or remove
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        MySwal.showLoading();
      },
    });
    const datas = await axios
      .get(api + `books/${id}`)
      .then((res) => res.data.data.book);
    axios
      .put(api + `books/${id}`, {
        id: datas.id,
        name: datas.name,
        year: datas.year,
        author: datas.author,
        summary: datas.summary,
        publisher: datas.publisher,
        pageCount: datas.pageCount,
        readPage: 0,
        reading: true,
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
            html: <i>Berhasil ditambahkan ke daftar Reading</i>,
            icon: "success",
          });
          getData();
        }
      });
  };

  const onDelete = (id) => {
    const data = JSON.stringify({
      id: id,
    });

    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Please Wait !",
          html: "Deleting Book", // add html attribute if you want or remove
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            MySwal.showLoading();
          },
        });
        axios
          .delete(api + `books/${id}`, {
            data: data,
            headers: { "Content-type": "application/x-www-form-urlencoded" },
          })
          .then((json) => {
            if (json.data.status === "success") {
              MySwal.fire("Deleted!", json.data.message, "success");
              getData();
            } else {
              MySwal.fire({
                title: id,
                html: <i>{json.data.message}</i>,
                icon: "error",
              });
            }
          });
      }
    });
  };

  return (
    <div className="container-fluid">
      {APIData.length !== 0 ? (
        <CardGroup className="container-fluid">
          {APIData.map((books) => {
            return (
              <div className="book-item" key={books.id}>
                <div className="books-item__content">
                  <Card className="books-item__card" body>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="128"
                      height="128"
                      fill="currentColor"
                      className="book-icon bi bi-book m-auto"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                    </svg>

                    <Link className="edit-icon" to="/Edit" onClick={() => {}}>
                      <Button onClick={() => setData(books)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </Button>
                    </Link>

                    <CardBody>
                      <CardTitle tag="h5" className="books-item__name ">
                        {books.name}
                      </CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted books-item__publisher"
                        tag="h6"
                      >
                        {books.publisher}
                      </CardSubtitle>
                      <CardText>{books.summary}</CardText>
                      <CardText>
                        {books.reading === "true" ? (
                          <span>
                            <span className="text-muted">Status:</span> Reading
                          </span>
                        ) : books.finished === "true" ? (
                          <span>
                            <span className="text-muted">Status:</span> Finished
                          </span>
                        ) : (
                          <span>
                            <span className="text-muted">Status:</span> Book
                            List
                          </span>
                        )}
                      </CardText>
                      <div className="book-item__action">
                        {books.reading === "true" ? (
                          <Button
                            className="finished"
                            color="success"
                            tag="input"
                            type="button"
                            value="Finished"
                            onClick={() => onFinished(books.id)}
                          />
                        ) : books.finished === "true" ? (
                          <Button
                            className="read"
                            color="warning"
                            tag="input"
                            type="button"
                            value="Read"
                            onClick={() => onRead(books.id)}
                          />
                        ) : (
                          <Button
                            className="read"
                            color="warning"
                            tag="input"
                            type="button"
                            value="Read"
                            onClick={() => onRead(books.id)}
                          />
                        )}

                        <Button
                          className="delete"
                          color="danger"
                          tag="input"
                          type="button"
                          value="Delete"
                          onClick={() => onDelete(books.id)}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            );
          })}
        </CardGroup>
      ) : (
        <div>
          <h1 className="books-list__empty-message-text">
            Silakan Berikan tanda kepada buku yang sudah selesai dibaca.
          </h1>
          <p className="books-list__empty-message">Tidak ada buku.</p>
        </div>
      )}
    </div>
  );
}

export default FinishedBookComponent;
