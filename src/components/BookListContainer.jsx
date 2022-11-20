import React from "react";
import BooksItemList from "./BooksItemList";

function BookListContainer({ books, onDelete, onReading, onFinished,onEdit }) {
  return (
    <div className="book-list__container">
      <BooksItemList
        books={books}
        onDelete={onDelete}
        onReading={onReading}
        onFinished={onFinished}
        onEdit={onEdit}
      />
    </div>
  );
}

export default BookListContainer;
