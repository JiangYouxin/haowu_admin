import React from 'react';
import moment from 'moment';
import { asks } from '../api/collections.js';
import { render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import User from './User';

var fconf = {
    qiniu: {
        site: 'http://7xudgy.com1.z0.glb.clouddn.com/'
    }
}

class Ask extends React.Component {
    remove() {
        var msg = prompt('请输入屏蔽（审核不通过）理由');
        if (msg) {
            Meteor.call('notify_delete_ask', {
                ask_id: this.props.ask._id.valueOf(),
                reason: msg
            }, (err, r) => {
                if (!err && r) {
                    asks.update(this.props.ask._id, { $set: {status: 0} });
                    alert('模板消息发送成功');
                } else {
                    alert('模板消息发送失败');
                }
            });
        }
    }
    render() {
        var { ask, user } = this.props;
        return <tr>
            <td style={styles.td}>{moment.unix(ask._id.getTimestamp()).format('YYYY-MM-DD HH:mm:ss')}</td>
            <td style={styles.td} onClick={()=>{User.popup(user._id)}}>
                <img src={user.headimgurl} style={{width: 36, height:36, borderRadius: '50%', marginRight: 5}} />
                { user.nickname }
                { user.status == 2 && <span className="label-danger label"  style={{marginLeft: 4}}>已拉黑</span>}
            </td>
            <td style={styles.td}>{ask.text}</td>
            <td>
                {ask.status==0 && <button type="button" style={styles.btn} className="btn btn-default" disabled="disabled">已屏蔽</button>}
                {ask.status!=0 && <a type="button" style={styles.btn} className="btn btn-danger" onClick={this.remove.bind(this)}>屏蔽</a>}
            </td>
        </tr>
    }
}

export default Ask;

var styles = {
    td: {
        verticalAlign: 'middle'
    },
    btn: {
        marginRight: 2
    }
}
