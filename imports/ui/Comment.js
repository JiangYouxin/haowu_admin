import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { posts, comments, users } from '../api/collections.js';
import _ from 'underscore';
import moment from 'moment';
import { Mongo } from 'meteor/mongo';

class Comment extends React.Component {
    render() {
        var { post, user, user0, comment } = this.props;
        return (
            <div className='panel panel-default'>
                <div className="panel-heading">
                    <button className='btn btn-danger pull-right'>删除</button>
                    <img className='avatar' src={user.headimgurl} />{user.nickname}
                    {' 评论了 '}
                    <img className='avatar' src={user0.headimgurl} />{user0.nickname}
                </div>
                <div className="panel-body">{ comment.text }</div>
                <div className="panel-footer">
                {moment.unix(comment._id.getTimestamp()).format('YYYY-MM-DD HH:mm:ss')}
                </div>
            </div>
        );
    }
}

export default createContainer((props) => {
    var user = users.findOne(new Mongo.ObjectID(props.comment.user_id));
    var post = posts.findOne(new Mongo.ObjectID(props.comment.post_id));
    var user0 = users.findOne(new Mongo.ObjectID(post.user_id));
    return {
        post, user0, user
    };
}, Comment);
