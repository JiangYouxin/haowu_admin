import React from 'react';
import { Link } from 'react-router';

var App = ({children, location}) => {
    return (
        <div>
            <ul className="nav nav-tabs">
                <li role="presentation" className={location.pathname == '/posts' ? 'active' : ''}>
                    <Link to="/posts">主贴</Link>
                </li>
                <li role="presentation" className={location.pathname == '/comments' ? 'active' : ''}>
                    <Link to="/comments">评论</Link>
                </li>
            </ul>
            <div className='container'>
            { children }
            </div>
        </div>
    );
};

export default App;
