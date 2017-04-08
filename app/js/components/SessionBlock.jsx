import React from 'react'
import { user } from '../userState'
import { auth } from '../firebase'

class SessionBlock extends React.Component {
  logOut() {
    auth.signOut().then(function() {
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  render() {
    return(
      <section id="session-block">
        <div>
          <span>
            {`Logged as: `}
          </span>

          <strong>
            {user.email}
          </strong>
        </div>

        <div>
          <button
            onClick={this.logOut.bind(this)}
            class="btn btn-danger btn-xs"
            type="button"
          >
            Logout
          </button>
        </div>
      </section>
    )
  }
}

export default SessionBlock
