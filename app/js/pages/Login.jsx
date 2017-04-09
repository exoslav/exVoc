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

  signIn(e) {
    e.preventDefault()
    auth.signInWithEmailAndPassword(this.state.name, this.state.password)
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
        <h1>Welcome to <strong>Slovíčkárno</strong> - online dictionary</h1>
        <p>
          Are you tired of writing your words in some useless notebook or piece of paper? If your answer is <strong>YES</strong>, keep reading and you might decide that <strong>Slovíčkárno</strong> was made exactly for you!
        </p>
        <p>
          Based on frontend technologies, <strong>Slovíčkárno</strong> is the cool tool for keeping your vocabulary in the perfect shape. You can easily add or remove your words in databse, mark your featured words and keep your learning curve in rapid progess!
        </p>
        <p>
          <strong>Slovíčkárno</strong> was built with these cool techs: react, firebase, flux, CSS, HTML, bootstrap and webpack2
        </p>
        <p>
          Are you a new user of <strong>Slovíčkárno</strong>? You can register in the form below! It is for free.
        </p>
        <div class="row">
          <div class="col-lg-6">
            <h3>Login or register</h3>
            <form onSubmit={this.signIn.bind(this)} id="login-form" class="bg-primary clearfix">
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
      </div>
    )
  }
}

export default Login
