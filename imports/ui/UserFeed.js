import React from 'react';
import moment from 'moment';
import { users, user_feeds, audios } from '../api/collections.js';
import { render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import User from './User';
import { Mongo } from 'meteor/mongo';

var fconf = {
    qiniu: {
        site: 'http://7xudgy.com1.z0.glb.clouddn.com/'
    }
}

class UserFeed extends React.Component {
    render() {
        var { user_feed, user, read_count } = this.props;
        return (
            user && <tr>
                <td style={styles.td} onClick={()=>{User.popup(user._id)}}>
                    <img src={user.headimgurl} style={{width: 36, height:36, borderRadius: '50%', marginRight: 5}} />
                    { user.nickname }
                </td>
                <td style={styles.td}>{(user.subids || []).length}</td>
                <td style={styles.td}>{moment(user_feed.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td style={styles.td}>{user_feed.posts.length}</td>
                <td style={styles.td}>{read_count}</td>
            </tr> || null
        );
    }
}

export default createContainer((props) => {
    return {
        user: users.findOne({_id: new Mongo.ObjectID(props.user_feed.user_id)}),
        read_count: audios.find({reads: props.user_feed.user_id}).count()
    }
}, UserFeed);

var styles = {
    td: {
        verticalAlign: 'middle'
    },
    btn: {
        marginRight: 2
    }
}
