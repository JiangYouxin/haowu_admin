import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';
import { users, posts, audios, comments, topics, user_feeds, qr_codes } from '../imports/api/collections.js';

Meteor.startup(() => {
    var opts = {
        insert: userId => !!userId,
        update: userId => !!userId,
        remove: userId => !!userId
    };
    users.allow(opts);
    posts.allow(opts);
    audios.allow(opts);
    comments.allow(opts);
    user_feeds.allow(opts);
    topics.allow(opts);

    Meteor.methods({
        login: function({openid, token}) {
            var docs = qr_codes.find({
                openid,
                token
            }).fetch();
            if (docs && docs.length > 0) {
                var openid = docs[0].openid;
                var user = users.findOne({
                    openid,
                    is_admin: 1
                });
                if (user) {
                    this.setUserId(openid);
                    return true;
                }
            }
            return false;
        }
    });
    Meteor.publish('all', function() {
        return [
            users.find({}),
            posts.find({}),
            user_feeds.find({}, {
                sort: { updatedAt: -1 },
                limit: 80
            }),
            audios.find({}),
            comments.find({}, {
                sort: { uptime: -1 },
                limit: 40
            }),
            topics.find({})
        ]
    });
    Meteor.publish('qr_code', function() {
        var result = HTTP.call('GET', 'http://localhost:8080/internal/qr_code');
        var _id = result.data._id;
        return qr_codes.find({_id: _id});
    });
});
