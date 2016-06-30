import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import UserFeed from './UserFeed.js';
import { user_feeds } from '../api/collections.js';
import _ from 'underscore';

var UserFeeds = ({user_feeds}) => {
    return (
        <div className="container">
            <h3>最近刷新Feed流用户</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>用户</th>
                        <th>被订阅</th>
                        <th>发帖/被听</th>
                        <th>刷新Feed时间</th>
                        <th>阅读条数</th>
                    </tr>
                </thead>
                <tbody>
                    { user_feeds.map((user_feed) => {
                        return user_feed && <UserFeed key={user_feed._id} user_feed={user_feed} /> || null;
                    })}
                </tbody>
            </table>
        </div>
    );
};

// TODO posts分页；user太多的性能问题
export default createContainer(() => {
    return {
        user_feeds: user_feeds.find({}, {sort: {updatedAt: -1}}).fetch()
    }
}, UserFeeds);
