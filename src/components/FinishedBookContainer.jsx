import React from 'react';
import BooksItemList from './BooksItemList';

function FinishedBookContainer({books, onReading, onDelete}) {

    const finishedList = books.filter(book => book.finished === "true");

    console.log(finishedList, '<== finished list')
    return (
        <div className='archived-book-container'>
            <BooksItemList books={finishedList} onReading={onReading} onDelete={onDelete} />
        </div>
    );
}

export default FinishedBookContainer;