import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

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
                <li role="presentation" className={location.pathname == '/user_feeds' ? 'active' : ''}>
                    <Link to="/user_feeds">活跃用户</Link>
                </li>
            </ul>
            <div className='container'>
            { children }
            </div>
        </div>
    );
};

export default createContainer(() => {
    Meteor.subscribe('all');
    return {

    }
}, App);
