import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import App from '../imports/ui/App.js';
import Posts from '../imports/ui/Posts.js';
import Comments from '../imports/ui/Comments.js';

// TODO: 登录
Meteor.startup(() => {
    render(
        <Router history={browserHistory}>
            <Route path="/" component={App} >
                <Route path="posts" component={Posts} />
                <Route path="comments" component={Comments} />
                <IndexRedirect to='posts' />
            </Route>
        </Router>,
        document.getElementById('render-target')
    );
});
