import React from 'react'
import Auth from './auth/Auth'
import { Router, Route } from 'react-router-dom'
import Callback from './components/Callback'
import createHistory from 'history/createBrowserHistory'
import App from './App';
const history = createHistory()



const auth = new Auth(history)

const handleAuthentication = async (props: any, dispatch) => {
  const location = props.location
  if (/access_token|id_token|error/.test(location.hash)) {
    const user = await auth.handleAuthentication()
    console.log('user', user)
    // user && dispatch(user)
  }
}

export const makeAuthRouting = () => {

  
  return (
    <Router history={history}>
      <div>
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props, dispatch)
            return <Callback />
          }}
        />
        <Route
          render={props => {
            return <App auth={auth} {...props} />
          }}
        />
      </div>
    </Router>
  )
}
