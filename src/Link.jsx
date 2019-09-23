import React from 'react';

export default class Link extends React.Component {
  constructor(props) {
    super(props);
    //quirk that is recommended by react. lame.
    this.handle = this.handle.bind(this);
  }

  handle(event) {
    const { to, history } = this.props
    const props = this.props.props || {};

    event.preventDefault();

    history.push(to, props);
    return false;
  }

  render() {
    const { to, children } = this.props;
    const props = { href: to, onClick: this.handle };
    return React.createElement('a', props, children);
  }
}
