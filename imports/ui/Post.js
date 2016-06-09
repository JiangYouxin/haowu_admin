import React from 'react';
import moment from 'moment';

var fconf = {
    qiniu: {
        site: 'http://7xudgy.com1.z0.glb.clouddn.com/'
    }
}

export default ({post}) => (
    <tr className="success">
        <td style={styles.td}>{moment(post._id.getTimestamp() * 1000).format('YYYY-MM-DD hh:mm:ss')}</td>
        <td style={styles.td}>{post.openid}</td>
        <td style={styles.td}>
            <a href={fconf.qiniu.site + post.pic_id} target="_blank">
                <img src={fconf.qiniu.site + post.pic_id + '-c167'} style={{width: 67, height:67}}/>
            </a>
        </td>
        <td style={styles.td}>{post.w}*{post.h}</td>
        <td style={styles.td}>
            <a onClick={()=>this.refs.audio.play()}>播放语音</a>
            <audio ref="audio" src={fconf.qiniu.site + post.audio_id} />
        </td>
        <td style={styles.td}>{Math.floor(post.length/1000)}{'"'}</td>
        <td style={styles.td}>{(post.likes || []).length}赞 {(post.reads || []).length}听过</td>
        <td style={styles.td}>
            {post.status==0 && <button type="button" style={styles.btn} className="btn btn-default" disabled="disabled">已删除</button>}
            {post.status!=0 && <button type="button" style={styles.btn} className="btn btn-danger">删除</button>}
            {post.status==1 && <button type="button" style={styles.btn} className="btn btn-primary">屏蔽</button>}
            {post.status==2 && <button type="button" style={styles.btn} className="btn btn-info">解除屏蔽</button>}
        </td>
    </tr>
);

var styles = {
    td: {
        verticalAlign: 'middle'
    },
    btn: {
        marginRight: 2
    }
}
