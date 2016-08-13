import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Comment from './Comment.js';
import { comments } from '../api/collections.js';
import _ from 'underscore';

var Comments = ({comments}) => {
    return (
        <div className="container">
            <h3>评论列表</h3>
            {comments && comments.map(comment=> <Comment key={comment._id} comment={comment} />)}
        </div>
    );
};

// TODO posts分页；user太多的性能问题
export default createContainer(() => {
    Meteor.subscribe('comments');
    return {
        comments: comments.find({}, {
            sort: { uptime: -1 }
        }).fetch()
    }
}, Comments);
