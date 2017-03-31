import Styles from '../css/app/main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory} from 'react-router'
import Layout from './pages/Layout'
import EnsureLoginState from './EnsureLoginState'
import Login from './pages/Login'
import Vocabulary from './pages/Vocabulary'
import { app, auth, db } from './firebase'

// function requireAuth(nextState, replace) {
//   console.log(nextState)
//   console.log(nextState.params)
//   console.log(replace)
//   // replace({
//   //   pathname: 'www.seznam.cz'
//   // })
// }

const appContainer = document.getElementById('app')
ReactDOM.render(
  <Router history={hashHistory} >
    <Route path="/" component={Layout}>
      <IndexRoute component={Login} ></IndexRoute>

      <Route component={EnsureLoginState}>
        <Route path="/vocabulary" component={Vocabulary}></Route>
      </Route>
    </Route>
  </Router>,
appContainer)
