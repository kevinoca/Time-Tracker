import React, { Component } from 'react'
import Navbar from "./navbar"
import Home from "./views/home"
import Other from "./views/other"
import Login from "./views/login"
import PageNotFound from "./views/pageNotFound"
import Dashboard from "./views/dashboard"
import Button from '@material-ui/core/Button'
import { Route, Switch, Redirect } from "react-router-dom";

export default class App extends Component {

  constructor(props) {

    super(props)

    this.state = {
      authenticated: false,
      user: undefined,
    }

  }

  performSignIn = user => this.setState({ authenticated: true, user })

  render() {

    const { user, authenticated } = this.state

    return (

      <Switch>
        <Route exact path="/" render={(props) => (authenticated) ? <Redirect to="/home" /> : <Login {...props} performSignIn={this.performSignIn} />} />
        <Route exact path="/login" render={(props) => (authenticated) ? <Redirect to="/home" /> : <Login {...props} performSignIn={this.performSignIn} />} />
        <PrivateRouter authenticated={authenticated} path='/home' component={Home} user={user} />
        <PrivateRouter authenticated={authenticated} path='/other' component={Other} user={user} />
        <PrivateRouter authenticated={authenticated} path='/dashboard' component={Dashboard} user={user} />
        <Route component={PageNotFound} />
      </Switch>

    )

  }

}

const PrivateRouter = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (authenticated)
      ? <Component {...rest} {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    } />
  )
};
