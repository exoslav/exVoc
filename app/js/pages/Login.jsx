import React from 'react'
import { auth, db } from '../firebase'
import { user, setUser } from '../userState'

class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      password: '',
    }
  }

  setName(e) {
    this.setState({
      name: e.target.value
    })
  }

  setPassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  componentDidMount() {
    const email = document.getElementById('login-email')
    const pass = document.getElementById('login-pass')
    const form = document.getElementById('login-form')

    form.addEventListener('submit', e => {
      e.preventDefault()
      auth.signInWithEmailAndPassword(email.value, pass.value)
    })


  }

  signUp() {
    let { name, password } = this.state
    const promise = auth.createUserWithEmailAndPassword(name, password)

    .then(user => {
      db.ref(`users/${user.uid}`).set({
        name,
        id: user.uid
      })
    })

    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.')
      } else {
        alert(errorMessage)
      }
    })
  }

  render() {
    return(
      <div class="container">
        <h1>Register or log in into your app, please.</h1>

        <div class="row">
          <form id="login-form" class="col-lg-6">
            <div class="form-group">
              <input
                value={this.state.name}
                id="login-email"
                class="form-control"
                type="email"
                placeholder="e-mail adress"
                onChange={this.setName.bind(this)}
              />
            </div>

            <div class="form-group">
              <input
                value={this.state.password}
                id="login-pass"
                class="form-control"
                type="text"
                placeholder="password"
                onChange={this.setPassword.bind(this)}
              />
            </div>

            <button
              onClick={this.signUp.bind(this)}
              class="btn btn-info pull-right"
              type="button"
            >
              Register
            </button>

            <button
              class="btn btn-info pull-right"
              type="submit"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
