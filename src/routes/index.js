import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Home from "./home"
import Register from "./register"

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Home} />
    </Switch>
  </BrowserRouter>
)

export default Routes
