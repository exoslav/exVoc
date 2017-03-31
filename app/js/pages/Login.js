import React from 'react'
import { auth } from '../firebase'

class Login extends React.Component {
  constructor() {
    super()
    console.log(auth.currentuser)
    // console.log(auth)
  }

  componentDidMount() {
    const email = document.getElementById('login-email')
    const pass = document.getElementById('login-pass')
    const form = document.getElementById('login-form')

    form.addEventListener('submit', e => {
      e.preventDefault()
      auth.signInWithEmailAndPassword(email.value, pass.value)
    })

    auth.onAuthStateChanged(user => {
      console.log(user)
    })
  }

  render() {
    return(
      <div class="container">
        <h1>Přihlašte se prosím do své apliakce</h1>

        <div class="row">
          <form id="login-form" class="col-lg-6">
            <div class="form-group">
              <input value="test@test.cz" id="login-email" class="form-control" type="email" placeholder="e-mail adress" />
            </div>

            <div class="form-group">
              <input value="123456" id="login-pass" class="form-control" type="text" placeholder="password" />
            </div>

            <button
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
