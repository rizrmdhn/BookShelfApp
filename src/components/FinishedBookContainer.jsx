import React from 'react';
import BooksItemList from './BooksItemList';

function FinishedBookContainer({books, onReading, onDelete, onEdit}) {

    const finishedList = books.filter(book => book.finished === "true");

    return (
        <div className='archived-book-container'>
            <BooksItemList books={finishedList} onReading={onReading} onDelete={onDelete} onEdit={onEdit} />
        </div>
    );
}

export default FinishedBookContainer;