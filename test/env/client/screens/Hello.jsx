import React from 'react'

import Link from '../components/Link'

export default class Hola extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <ul>
          <li><Link to="/" history={this.props.history}>Home</Link></li>
          <li><Link to="/about" history={this.props.history}>About Us</Link></li>
          <li><Link to="/more/1/comments" history={this.props.history}>More 1</Link></li>
          <li><Link to="/more/2/comments" history={this.props.history}>More 2</Link></li>
        </ul>
      </div>
    )
  }
}
