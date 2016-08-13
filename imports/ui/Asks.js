import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Ask from './Ask.js';
import { asks, users } from '../api/collections.js';
import _ from 'underscore';

var Asks = ({asks, users}) => {
    return (
        <div className="container">
            <h3>话题列表</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>更新时间</th>
                        <th>发布者</th>
                        <th>标题</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    { asks.map((ask) => {
                        var user = _.find(users, (user)=>(user._id == ask.user_id));
                        return user && <Ask key={ask._id} ask={ask} user={user}/> || null;
                    })}
                </tbody>
            </table>
        </div>
    );
};

// TODO posts分页；user太多的性能问题
export default createContainer(() => {
    Meteor.subscribe('asks');
    return {
        asks: asks.find({
        }, {
            sort: { updatedAt: -1 }
        }).fetch(),
        users: users.find({}).fetch()
    }
}, Asks);
