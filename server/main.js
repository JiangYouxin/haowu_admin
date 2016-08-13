import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';
import { users, posts, audios, comments, topics, asks, user_feeds, qr_codes } from '../imports/api/collections.js';

import qs from 'querystring';

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
    asks.allow(opts);

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
        },
        notify_topic: function({topic_id}) {
            var result = HTTP.call('GET', 'http://localhost:8080/internal/notify_mark?topic_id=' + topic_id);
            return result.data.result == 'ok';
        },
        notify_delete_ask: function({ask_id, reason}) {
            console.log({
                ask_id,
                reason
            });
            var result = HTTP.call('GET', 'http://localhost:8080/internal/notify_delete_ask?' + qs.stringify({
                ask_id,
                reason
            }));
            console.log(result);
            return result.data.result == 'ok';
        },
        notify_remove_ask: function({post_id, reason}) {
            console.log({
                post_id,
                reason
            });
            var result = HTTP.call('GET', 'http://localhost:8080/internal/notify_remove_ask?' + qs.stringify({
                post_id,
                reason
            }));
            console.log(result);
            return result.data.result == 'ok';
        }
    });
    Meteor.publish('user_feeds', function() {
        var user_feed_docs = user_feeds.find({}, {
            sort: { updatedAt: -1 },
            limit: 80
        });
        var user_docs = users.find({
            _id: {
                $in: user_feed_docs.map(doc=>new Mongo.ObjectID(doc.user_id))
            }
        });
        return [
            user_docs,
            user_feed_docs
        ];
    });
    Meteor.publish('posts', function() {
        var post_docs = posts.find({});
        var user_docs = users.find({
            _id: {
                $in: post_docs.map(doc=>new Mongo.ObjectID(doc.user_id))
            }
        });
        return [
            user_docs,
            post_docs
        ]
    });
    Meteor.publish('topics', function() {
        var topic_docs = topics.find({});
        var user_docs = users.find({
            _id: {
                $in: topic_docs.map(doc=>new Mongo.ObjectID(doc.user_id))
            }
        });
        return [
            user_docs,
            topic_docs
        ]
    });
    Meteor.publish('asks', function() {
        var ask_docs = asks.find({});
        var user_docs = users.find({
            _id: {
                $in: ask_docs.map(doc=>new Mongo.ObjectID(doc.user_id))
            }
        });
        return [
            user_docs,
            ask_docs
        ]
    });
    Meteor.publish('comments', function() {
        var comment_docs = comments.find({}, {
            sort: { uptime: -1 },
            limit: 40
        });
        var post_docs = posts.find({
            _id: {
                $in: comment_docs.map(doc=>new Mongo.ObjectID(doc.post_id))
            }
        });
        var post_user_ids = post_docs.map(doc=>new Mongo.ObjectID(doc.user_id));
        var comment_user_ids = comment_docs.map(doc=>new Mongo.ObjectID(doc.user_id));
        var replies = comment_docs.map(doc=>doc.replies);
        var reply_user_ids = _.chain(replies)
            .flatten()
            .map(doc=>[doc.user_id, doc.user_id2])
            .flatten()
            .uniq()
            .map(id=>new Mongo.ObjectID(id))
            .value();
        var user_ids = _.uniq([
            ...post_user_ids,
            ...comment_user_ids,
            ...reply_user_ids
        ]);

        var user_docs = users.find({
            _id: {
                $in: user_ids
            }
        });
        return [
            user_docs,
            post_docs,
            comment_docs,
        ]
    });
    Meteor.publish('qr_code', function() {
        var result = HTTP.call('GET', 'http://localhost:8080/internal/qr_code');
        var _id = result.data._id;
        return qr_codes.find({_id: _id});
    });
});
