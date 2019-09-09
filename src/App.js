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

  render() {

    const isLoggedIn = false

    return (

      <>

        {/* <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/login" component={Login} />
          <Redirect from="/" to="/login" />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/other" component={Other} />
          <Route component={PageNotFound} />
        </Switch> */}

        <Switch>
          <Route exact path="/" render={() => (
            isLoggedIn
              ? (<Redirect to="/home" />)
              : (<Redirect to="/login" />)
          )} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/other" component={Other} />
          <Route component={PageNotFound} />
        </Switch>

      </>

    )

  }

}