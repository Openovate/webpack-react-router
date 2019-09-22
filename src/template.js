import React from 'react';

const pathToRegexp = require('path-to-regexp');

class Router extends React.Component {
  constructor(props) {
    super(props);

    const { history } = this.props;

    history.listen(this.handle.bind(this));

    //initial state
    this.state = {};

    //handle the first route
    this.handle(history.location, 'push');
  }

  handle(location, action) {
    //if no pathname
    if (!location.pathname) {
      //nothing we can do...
      return;
    }

    {CLAUSES}
  }

  render() {
    //if no component
    if (!this.state.component) {
      //nothing we can do...
      return null;
    }

    const { history } = this.props;

    return React.createElement(this.state.component, { history });
  }
}

export default (history) => {
  return React.createElement(Router, { history })
}
