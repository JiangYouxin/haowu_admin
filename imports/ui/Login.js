import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import moment from 'moment'
import { browserHistory } from 'react-router';

import { qr_codes } from '../api/collections'

class Login extends React.Component {
    componentWillUpdate(nextProps) {
        var { qr_code } = nextProps;
        if (qr_code.openid) {
            Meteor.call('login', {
                token: qr_code.token,
                openid: qr_code.openid
            }, (err, r) => {
                if (!err && r) {
                    Meteor.connection.setUserId(qr_code.openid);
                    browserHistory.replace('/posts');
                } else {
                    alert('登录失败');
                }
            });
        }
    }
    render() {
        var { qr_code } = this.props;
        console.log(qr_code);
        if (qr_code) {
            return (
                <div style={{textAlign: 'center'}}>
                    <img style={{display:'block', margin: '0 auto'}} src={qr_code.imgurl} />
                    扫描二维码登陆
                </div>
            );
        } else {
            return <div />;
        }
    }
}

export default createContainer(() => {
    Meteor.subscribe('qr_code');
    var qr_code_docs = qr_codes.find({}).fetch();
    if (qr_code_docs.length == 0)
        return {};
    else
        return {qr_code: qr_code_docs[0]}
}, Login);
