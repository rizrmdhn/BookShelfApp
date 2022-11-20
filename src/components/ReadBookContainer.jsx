import React from 'react';
import BooksItemList from './BooksItemList';


function ReadBookContainer({ books, onDelete, onFinished, onEdit }) {

    const readingList = books.filter(book => book.reading === "true");

    return (
        <div className='reading-book__container'>
            <BooksItemList books={readingList} onFinished={onFinished} onDelete={onDelete} onEdit={onEdit} />
        </div>
    );
}

export default ReadBookContainer;