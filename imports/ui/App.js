import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Post from './Post.js';
import { posts } from '../api/posts.js';
import { users } from '../api/users.js';
import _ from 'underscore';

var App = ({posts, users}) => {
    return (
        <div className="container">
            <table className="table table-striped">
            { posts.map((post) => {
                var user = _.find(users, (user)=>(user.openid == post.openid));
                return user && <Post key={post._id} post={post} user={user}/> || null;
            })}
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
