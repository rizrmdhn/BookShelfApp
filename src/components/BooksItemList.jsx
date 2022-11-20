import React from "react";
import { CardGroup } from "reactstrap";
import BooksItem from "./BooksItem";

function BooksItemList({ books, onDelete, onFinished, onReading, onEdit, name }) {
  return (
    <>
      {books.length !== 0 ? (
        <div className="books-itemlist__container">
          <CardGroup className="ms-5 me-5 mt-2 mb-2">
            {books.map((book) => (
              <BooksItem
                key={book.id}
                id={book.id}
                books={book}
                onDelete={onDelete}
                onFinished={onFinished}
                onReading={onReading}
                onEdit={onEdit}
                {...book}
              />
            ))}
          </CardGroup>
        </div>
      ) : (
        <>
          <h1>Silakan input buku terlebih dahulu</h1>
          <p className="books-list__empty-message">Tidak ada buku.</p>
        </>
      )}
    </>
  );
}

export default BooksItemList;
