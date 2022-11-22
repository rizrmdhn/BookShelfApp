import React from 'react';
import { Link } from 'react-router-dom';
import HeaderMenu from './HeaderMenu';
import ResponsiveMenu from './ResponsiveMenu';

function DisplayHeader() {
    return (
        <div className='Header container-fluid'>
            <p className='header-title' ><Link to="/">Bookshelf App</Link></p>
            <ResponsiveMenu/>
            <HeaderMenu />
        </div>
    );
}

export default DisplayHeader;