import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { posts, comments, users } from '../api/collections.js';
import User from './User';
import _ from 'underscore';
import moment from 'moment';
import { Mongo } from 'meteor/mongo';

var fconf = {
    qiniu: {
        site: 'http://7xudgy.com1.z0.glb.clouddn.com/'
    }
}

class Reply extends React.Component {
    render() {
        var { comment_id, reply, user, user0 } = this.props;
        return (
            <tr>
                <td style={styles.td}><img className='avatar' src={user.headimgurl} onClick={()=>User.popup(user._id)}/>{user.nickname}</td>
                <td style={styles.td}><img className='avatar' src={user0.headimgurl} onClick={()=>User.popup(user0._id)}/>{user0.nickname}</td>
                <td style={styles.td}>{reply.text}</td>
                <td style={styles.td}>{moment.unix(reply._id.getTimestamp()).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td style={styles.td}>
                    <button className='btn btn-danger' onClick={()=>{
                        if (confirm('您确认要删除这条回复么？') && confirm('回复将直接从数据库中删除，不可恢复')) {
                            comments.update(comment_id, {
                                $pull: {
                                    replies: {
                                        _id: reply._id
                                    }
                                }
                            });
                        }
                    }}>删除</button>
                </td>
            </tr>
        );
    }
}

export default createContainer((props) => {
    var user = users.findOne(new Mongo.ObjectID(props.reply.user_id));
    var user0 = users.findOne(new Mongo.ObjectID(props.reply.user_id2));
    return {
        user0, user
    };
}, Reply);

var styles = {
    td: {
        verticalAlign: 'middle'
    },
    btn: {
        marginRight: 2
    }
}
