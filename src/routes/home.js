import React, { Component } from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"

import CreateContact from "../components/CreateContact"
import HomeContainer from "../containers/HomeContainer"
import ContactContainer from "../containers/ContactContainer"
import ContactGroup from "../components/ContactGroup"

const newContactSubscription = gql`
  subscription($owner: Int!) {
    contactAdded(owner: $owner) {
      id
      name
      phone
      email
    }
  }
`

class Home extends Component {
  componentWillMount() {
    const { userId } = this.props
    console.log(userId)

    // this.props.data.subscribeToMore({
    //   document: newContactSubscription,
    //   variables: {
    //     owner: userId
    //   },
    //   updateQuery: (prev, { subscriptionData }) => {
    //     if (!subscriptionData) {
    //       return prev
    //     }
    //     console.log(subscriptionData.data.contactAdded)
    //     return {
    //       ...prev,
    //       getAllContacts: [
    //         ...prev.getAllContacts,
    //         subscriptionData.data.contactAdded
    //       ]
    //     }
    //   }
    // })
  }
  render() {
    document.title = "Home"
    const { data: { loading, getAllContacts } } = this.props
    if (!loading) console.log(getAllContacts)

    return (
      <HomeContainer>
        <ContactContainer>
          <CreateContact refetch={this.props.data.refetch} />
        </ContactContainer>
        <div
          style={{
            overflowY: "auto",
            gridColumn: "2",
            gridRow: "1",
            padding: "3%",
            marginTop: "5%"
          }}
        >
          {!loading &&
            getAllContacts.length > 0 && (
              <ContactGroup contacts={getAllContacts} />
            )}
        </div>
      </HomeContainer>
    )
  }
}

const getContactsQuery = gql`
  {
    getAllContacts {
      name
      phone
      email
      id
    }
  }
`

export default graphql(getContactsQuery)(Home)
