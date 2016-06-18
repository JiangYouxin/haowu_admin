import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { posts, comments, users } from '../api/collections.js';
import User from './User';
import Reply from './Reply';
import _ from 'underscore';
import moment from 'moment';
import { Mongo } from 'meteor/mongo';

var fconf = {
    qiniu: {
        site: 'http://7xudgy.com1.z0.glb.clouddn.com/'
    }
}

class Comment extends React.Component {
    render() {
        var { post, user, user0, comment } = this.props;
        return (
            <div className='panel panel-default'>
                <div className="panel-heading">
                    { comment.status == 1 && <button className='btn btn-danger pull-right' onClick={()=>{
                        if (confirm('您确认要删除这条评论吗？')) {
                            comments.update(comment._id, {
                                $set: {
                                    status: 0
                                }
                            });
                        }
                    }}>删除</button> }
                    { comment.status == 0 && <button className='btn btn-default pull-right' disabled>已删除</button> }
                    <img className='avatar' src={user.headimgurl} onClick={()=>User.popup(user._id)}/>{user.nickname}
                    {' 评论了 '}
                    <img className='avatar' src={user0.headimgurl} onClick={()=>User.popup(user0._id)} />{user0.nickname}
                </div>
                <div className="panel-body">{ comment.text || <div>
                    <a onClick={()=>{console.log(comment);this.refs.audio.play()}}>播放语音</a>
                    <audio ref="audio" src={fconf.qiniu.site + comment.audio_id + '_mp3'} />
                </div>}</div>
                {comment.replies && comment.replies.length > 0 && <table className='table'>
                    <thead>
                        <tr>
                            <th>谁回复</th>
                            <th>回复谁</th>
                            <th>正文</th>
                            <th>时间</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    { comment.replies.map(reply=><Reply comment_id={comment._id} reply={reply} key={reply._id} />)}
                    </tbody>
                </table>}
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
