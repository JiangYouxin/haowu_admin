import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Post from './Post.js';
import { posts, users } from '../api/collections.js';
import _ from 'underscore';

class Posts extends React.Component {
    constructor() {
        super();
        this.state = { count: 40 };
    }
    more() {
        this.setState({ count: this.state.count + 40 });
    }
    render() {
        var {posts, users} = this.props;
        var {count} = this.state;
        posts = _.first(posts, count);
        return (
            <div className="container">
                <h3>主贴列表</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>发布时间</th>
                            <th>发布者</th>
                            <th>图</th>
                            <th>图尺寸</th>
                            <th>语音</th>
                            <th>语音长度</th>
                            <th>权重</th>
                            <th>话题</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        { posts.map((post) => {
                            var user = _.find(users, (user)=>(user._id == post.user_id));
                            return user && <Post key={post._id} post={post} user={user}/> || null;
                        })}
                    </tbody>
                </table>
                { this.props.posts.length > count &&
                    <button className='btn btn-default btn-block' style={{marginButtom: 20}} onClick={this.more.bind(this)}>更多</button>}
            </div>
        );
    }
}

// TODO posts分页；user太多的性能问题
export default createContainer(() => {
    Meteor.subscribe('posts');
    return {
        posts: posts.find({}, {
            sort: { _id: -1 }
        }).fetch(),
        users: users.find({}).fetch()
    }
}, Posts);
