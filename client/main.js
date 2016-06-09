import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.js';

// TODO: 登录
Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
