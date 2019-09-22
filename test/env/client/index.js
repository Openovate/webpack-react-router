import React from 'react'
import ReactDOM from 'react-dom'
import router from './router'

const { createBrowserHistory } = require('history')
const history = createBrowserHistory()

ReactDOM.render(
  router(history),
  document.getElementById('root')
)
