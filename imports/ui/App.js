import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Post from './Post.js';
import { posts, users } from '../api/collections.js';
import _ from 'underscore';

var App = ({posts, users}) => {
    return (
        <div className="container">
            <table className="table table-striped">
                <tbody>
                    { posts.map((post) => {
                        var user = _.find(users, (user)=>(user._id == post.user_id));
                        return user && <Post key={post._id} post={post} user={user}/> || null;
                    })}
                </tbody>
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
