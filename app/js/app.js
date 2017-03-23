import Styles from '../css/app/main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory} from 'react-router'

import Layout from './pages/Layout'

const app = document.getElementById('app')

ReactDOM.render(
  <Router history={hashHistory} >
    <Route path="/" component={Layout}></Route>
  </Router>,
app)

// ReactDOM.render(
//   <Router history={hashHistory} >
//     <Route path="/" component={Layout}>
//       <IndexRoute component={Featured}></IndexRoute>
//       <Route path="archives(/:article)" component={Archives}></Route>
//       <Route path="settings" component={Settings}></Route>
//     </Route>
//   </Router>,
// app)
