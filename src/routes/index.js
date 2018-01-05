import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Home from "./home"
import Register from "./register"
import Login from "./login"
import PrivateRoute from "../privateroute"

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
    </Switch>
  </BrowserRouter>
)

export default Routes
