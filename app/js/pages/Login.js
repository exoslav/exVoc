import React from 'react'
import { auth } from '../firebase'

class Login extends React.Component {
  constructor() {
    super()
    console.log(auth.currentuser)
    // console.log(auth)
  }

  render() {
    return(
      <div class="container">
        <h1>Přihlašte se prosím do své apliakce</h1>

        <div class="row">
          <form class="col-lg-6">
            <div class="form-group">
              <input class="form-control" type="email" placeholder="e-mail adress" />
            </div>

            <div class="form-group">
              <input class="form-control" type="password" placeholder="password" />
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
