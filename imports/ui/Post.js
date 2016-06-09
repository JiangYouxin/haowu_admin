import React from 'react';
import moment from 'moment';
import { posts } from '../api/posts.js';
import { render } from 'react-dom';
import User from './User';

var fconf = {
    qiniu: {
        site: 'http://7xudgy.com1.z0.glb.clouddn.com/'
    }
}

export default class Post extends React.Component {
    play() {
        // TODO: 播放，现在要兼容三个平台
        var { post } = this.props;
        this.refs.audio.play();
    }
    block() {
        posts.update(this.props.post._id, { $set: {status: 2} });
    }
    unblock() {
        posts.update(this.props.post._id, { $set: {status: 1} });
    }
    pic() {
        var { post } = this.props;
        render (
            <div className="modal-dialog modal-sm">
                <img src={fconf.qiniu.site + post.pic_id} style={{width:'100%', height:'auto'}} />
            </div>,
            document.getElementById('modal')
        );
        $('#modal').modal('show');
    }
    remove() {
        if (confirm('您确认要删除么？'))
            posts.update(this.props.post._id, { $set: {status: 0} });
    }
    user() {
        render(<User user={this.props.user} />, document.getElementById('modal'));
        $('#modal').modal('show');
    }
    render() {
        var { post, user } = this.props;
        return <tr className="success">
            <td style={styles.td}>{moment.unix(post._id.getTimestamp()).format('YYYY-MM-DD hh:mm:ss')}</td>
            <td style={styles.td} onClick={this.user.bind(this)}>
                <img src={user.headimgurl} style={{width: 36, height:36, borderRadius: '50%', marginRight: 5}} />
                { user.nickname }
                { user.status == 2 && <span className="label-danger label"  style={{marginLeft: 4}}>已拉黑</span>}
            </td>
            <td style={styles.td}>
                <img src={fconf.qiniu.site + post.pic_id + '-c167'} onClick={this.pic.bind(this)} style={{width: 67, height:67}}/>
            </td>
            <td style={styles.td}>{post.w}*{post.h}</td>
            <td style={styles.td}>
                <a onClick={this.play.bind(this)}>播放语音</a>
                <audio ref="audio" src={fconf.qiniu.site + post.audio_id} />
            </td>
            <td style={styles.td}>{Math.floor(post.length/1000)}{'"'}</td>
            <td style={styles.td}>{(post.likes || []).length}赞 {(post.reads || []).length}听过</td>
            <td style={styles.td}>
                {post.status==0 && <button type="button" style={styles.btn} className="btn btn-default" disabled="disabled">已删除</button>}
                {post.status!=0 && <a type="button" style={styles.btn} className="btn btn-danger" onClick={this.remove.bind(this)}>删除</a>}
                {post.status==1 && <a type="button" style={styles.btn} className="btn btn-primary" onClick={this.block.bind(this)}>屏蔽</a>}
                {post.status==2 && <a type="button" style={styles.btn} className="btn btn-success" onClick={this.unblock.bind(this)}>解除屏蔽</a>}
            </td>
        </tr>
    }
}

var styles = {
    td: {
        verticalAlign: 'middle'
    },
    btn: {
        marginRight: 2
    }
}
