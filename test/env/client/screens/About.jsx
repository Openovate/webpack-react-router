import React from 'react'

import Link from '../components/Link'

export default class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About World</h1>
        <ul>
          <li><Link to="/" history={this.props.history}>Home</Link></li>
          <li><Link to="/about" history={this.props.history}>About Us</Link></li>
          <li><Link to="/more" history={this.props.history}>More</Link></li>
        </ul>
      </div>
    )
  }
}
