import Styles from '../css/app/main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory} from 'react-router'
import Layout from './pages/Layout'
import EnsureLoginState from './EnsureLoginState'
import Login from './pages/Login'
import Vocabulary from './pages/Vocabulary'
import { auth } from './firebase'
import { user, setUser } from './userState'

const appHistory = hashHistory
let init = false

auth.onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    setUser(firebaseUser)
    appHistory.push('vocabulary')
  } else {
    setUser(null)
    appHistory.push('/')
  }

  if(!init) {
  	start()
  	init = true
  }
})

function start() {
	ReactDOM.render(
	  <Router history={hashHistory} >
	    <Route path="/" component={Layout}>
	      <IndexRoute component={Login} ></IndexRoute>

	      <Route path="/vocabulary" component={Vocabulary}></Route>

	    </Route>
	  </Router>,
	document.getElementById('app'))
}

/*
	      <Route component={EnsureLoginState}>
	        <Route path="/vocabulary" component={Vocabulary}></Route>
	      </Route>
*/