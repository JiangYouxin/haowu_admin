import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Topic from './Topic.js';
import { topics, users } from '../api/collections.js';
import _ from 'underscore';

var Topics = ({topics, users}) => {
    return (
        <div className="container">
            <h3>专辑列表</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>更新时间</th>
                        <th>发布者</th>
                        <th>标题</th>
                        <th>帖子数量</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    { topics.map((topic) => {
                        var user = _.find(users, (user)=>(user._id == topic.user_id));
                        return user && <Topic key={topic._id} topic={topic} user={user}/> || null;
                    })}
                </tbody>
            </table>
        </div>
    );
};

// TODO posts分页；user太多的性能问题
export default createContainer(() => {
    return {
        topics: topics.find({
            status: 1
        }, {
            sort: { updatedAt: -1 }
        }).fetch(),
        users: users.find({}).fetch()
    }
}, Topics);
