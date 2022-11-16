import React from 'react';
import BooksItemList from './BooksItemList';


function ReadBookContainer({ books, onDelete, onFinished }) {

    const readingList = books.filter(book => book.reading === "true");

    return (
        <div className='reading-book__container'>
            <BooksItemList books={readingList} onFinished={onFinished} onDelete={onDelete} />
        </div>
    );
}

export default ReadBookContainer;