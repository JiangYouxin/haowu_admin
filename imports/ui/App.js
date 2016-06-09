import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Post from './Post.js';
import { posts } from '../api/posts.js';
import { users } from '../api/users.js';

var App = ({posts}) => {
    return (
        <div className="container">
            <table className="table table-striped">
            { posts.map((post) => <Post key={post._id} post={post} />)}
            </table>
        </div>
    );
};

// TODO posts分页；user太多的性能问题
export default createContainer(() => {
    return {
        posts: posts.find({}, {
            sort: { _id: -1 }
        }).fetch(),
        users: users.find({}).fetch()
    }
}, App);
