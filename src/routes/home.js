import React from "react"
import { Header } from "semantic-ui-react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"

const Home = ({ data: { loading, getAllUsers } }) => {
  document.title = "Home"
  return loading ? (
    <h1> loading</h1>
  ) : (
    getAllUsers.map(user => (
      <div key={user.id}>
        <Header as="h3">{user.email}</Header>
        <br />
      </div>
    ))
  )
}

const getAllUsersQuery = gql`
  query {
    getAllUsers {
      id
      email
    }
  }
`

export default graphql(getAllUsersQuery)(Home)
