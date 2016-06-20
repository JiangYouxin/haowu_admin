import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { users, user_feeds } from '../api/collections.js';
import { createContainer } from 'meteor/react-meteor-data';

var fconf = {
    qiniu: {
        site: 'http://7xudgy.com1.z0.glb.clouddn.com/'
    }
}

class _User extends React.Component {
    block() {
        users.update(this.props.user._id, {$set: {status: 2}});
    }
    unblock() {
        users.update(this.props.user._id, {$set: {status: 1}});
    }
    resetFeed(){
        user_feeds.remove(this.props.user_feed._id);
    }
    render() {
        var { user, user_feed } = this.props;
        return (
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title"><img src={user.headimgurl} style={{width: 36, height:36, borderRadius: '50%', marginRight: 5}} />{user.nickname}</h4>
                    </div>
                    <div className="modal-body">
                        <dl className="dl-horizontal">
                            <dt>OpenID</dt>
                            <dd>{user.openid}</dd>
                            <dt>性别</dt>
                            <dd>{user.sex == '1' ? '男' : (user.sex == '2' ? '女' : '未知')}</dd>
                            <dt>地区</dt>
                            <dd>{user.province} {user.city}</dd>
                            <dt>被订阅</dt>
                            <dd>{(user.subids || []).length}</dd>
                            <dt>清除通知时间</dt>
                            <dd>{user.clear_badge && moment(new Date(user.clear_badge)).format('YYYY-MM-DD hh:mm:ss')}</dd>
                            <dt>上次刷Feed</dt>
                            <dd>{user_feed && moment(new Date(user_feed.updatedAt)).format('YYYY-MM-DD hh:mm:ss')}</dd>
                        </dl>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" onClick={this.resetFeed.bind(this)}>重置Feed流</button>
                        { user.status == 1 && <button type="button" className="btn btn-primary" onClick={this.block.bind(this)}>加入黑名单</button> }
                        { user.status == 2 && <button type="button" className="btn btn-success" onClick={this.unblock.bind(this)}>移出黑名单</button> }
                    </div>
                </div>
            </div>
        )
    }
}

var User = createContainer((props) => {
    var user = users.findOne({_id: props._id});
    var user_feed = user_feeds.findOne({user_id: props._id.valueOf()})
    return {
        user: user,
        user_feed: user_feed
    }
}, _User);

export default {
    popup: (_id) => {
        render (
            <User _id={_id} />,
            document.getElementById('modal')
        );
        $('#modal').modal('show');
    }
}
