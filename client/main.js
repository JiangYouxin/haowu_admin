import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import App from '../imports/ui/App.js';
import Posts from '../imports/ui/Posts.js';
import Topics from '../imports/ui/Topics.js';
import Asks from '../imports/ui/Asks.js';
import Comments from '../imports/ui/Comments.js';
import UserFeeds from '../imports/ui/UserFeeds.js';
import Login from '../imports/ui/Login.js';

function requireAuth(nextState, replace) {
    /*
    if (!Meteor.connection.userId())
        replace('/login');
        */
}

Meteor.startup(() => {
    render(
        <Router history={browserHistory}>
            <Route path="/login" component={Login} />
            <Route path="/" onEnter={requireAuth} component={App} >
                <Route path="posts" component={Posts} />
                <Route path="comments" component={Comments} />
                <Route path="topics" component={Topics} />
                <Route path="asks" component={Asks} />
                <Route path="user_feeds" component={UserFeeds} />
                <IndexRedirect to='posts' />
            </Route>
        </Router>,
        document.getElementById('render-target')
    );
});
