import React from "react";
import BooksItemBody from "./BooksItemBody";

function BooksItem({
  id,
  books,
  name,
  publisher,
  summary,
  reading,
  finished,
  onDelete,
  onFinished,
  onReading,
  onEdit,
}) {
  return (
    <div className="book-item ms-4 me-4 mt-4 mb-4">
      <BooksItemBody
        id={id}
        books={books}
        name={name}
        publisher={publisher}
        summary={summary}
        reading={reading}
        finished={finished}
        onDelete={onDelete}
        onReading={onReading}
        onFinished={onFinished}
        onEdit={onEdit}
      />
    </div>
  );
}

export default BooksItem;
