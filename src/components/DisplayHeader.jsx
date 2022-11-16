import React from 'react';
import { Link } from 'react-router-dom';
import HeaderMenu from './HeaderMenu';

function DisplayHeader() {
    return (
        <div className='Header'>
            <p className='header-title' ><Link to="/">Bookshelf App</Link></p>
            <HeaderMenu />
        </div>
    );
}

export default DisplayHeader;