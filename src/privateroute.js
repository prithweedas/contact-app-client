import React from "react"
import { Route, Redirect } from "react-router-dom"
import gql from "graphql-tag"
import { graphql } from "react-apollo"

const PrivateRoute = ({ data, component: Component, ...rest }) =>
  data.loading ? null : (
    <Route
      {...rest}
      render={props => {
        if (data.isAuthenticated.auth)
          return <Component userId={data.isAuthenticated.userId} {...props} />
        else
          return (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          )
      }}
    />
  )

const auth = gql`
  query {
    isAuthenticated {
      auth
      userId
    }
  }
`

export default graphql(auth, {
  options: { fetchPolicy: "network-only" }
})(PrivateRoute)
