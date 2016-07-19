import React from 'react';
import moment from 'moment';
import { topics } from '../api/collections.js';
import { render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import User from './User';

var fconf = {
    qiniu: {
        site: 'http://7xudgy.com1.z0.glb.clouddn.com/'
    }
}

class Topic extends React.Component {
    remove() {
        if (confirm('您确认要删除么？'))
            topics.update(this.props.topic._id, { $set: {status: 0} });
    }
    mark() {
        if (confirm('推到首页会给专辑作者发模板消息，是否继续？')) {
            topics.update(this.props.topic._id, { $set: {mark: 1} });
            Meteor.call('notify_topic', {
                topic_id: this.props.topic._id
            }, (err, r) => {
                if (!err && r) {
                    alert('模板消息发送成功');
                } else {
                    alert('模板消息发送失败');
                }
            });
        }
    }
    unmark() {
        topics.update(this.props.topic._id, { $set: {mark: 0} });
    }
    render() {
        var { topic, user } = this.props;
        return <tr>
            <td style={styles.td}>{moment.unix(topic._id.getTimestamp()).format('YYYY-MM-DD HH:mm:ss')}</td>
            <td style={styles.td} onClick={()=>{User.popup(user._id)}}>
                <img src={user.headimgurl} style={{width: 36, height:36, borderRadius: '50%', marginRight: 5}} />
                { user.nickname }
                { user.status == 2 && <span className="label-danger label"  style={{marginLeft: 4}}>已拉黑</span>}
            </td>
            <td style={styles.td}>{topic.title}</td>
            <td style={styles.td}>{topic.posts.length}</td>
            <td>
            {topic.status==0 && <button type="button" style={styles.btn} className="btn btn-default" disabled="disabled">已删除</button>}
            {topic.status!=0 && <a type="button" style={styles.btn} className="btn btn-danger" onClick={this.remove.bind(this)}>删除</a>}
            {topic.mark==0 && <a type="button" style={styles.btn} className="btn btn-primary" onClick={this.mark.bind(this)}>推到首页</a>}
            {topic.mark==1 && <a type="button" style={styles.btn} className="btn btn-warning" onClick={this.unmark.bind(this)}>从首页撤下</a>}
            </td>
        </tr>
    }
}

export default Topic;

var styles = {
    td: {
        verticalAlign: 'middle'
    },
    btn: {
        marginRight: 2
    }
}
