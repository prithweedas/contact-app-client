import React from "react"
import { Header, Card } from "semantic-ui-react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"

import CreateContact from "../components/CreateContact"
import HomeContainer from "../containers/HomeContainer"
import ContactContainer from "../containers/ContactContainer"
import ContactListContainer from "../containers/ContactsListContainer"
import Contact from "../components/Contact"

const Home = ({ data: { loading, getAllContacts } }) => {
  document.title = "Home"
  return (
    <HomeContainer>
      <ContactContainer>
        <CreateContact />
      </ContactContainer>
      <div
        style={{
          overflowY: "auto",
          gridColumn: "2",
          gridRow: "1",
          padding: "3%"
        }}
      >
        <Card.Group>
          {!loading &&
            getAllContacts.length > 0 &&
            getAllContacts.map(contact => (
              <Contact
                key={`contact-${contact.id}`}
                name={contact.name}
                email={contact.email}
                phone={contact.phone}
              />
            ))}
        </Card.Group>
      </div>
    </HomeContainer>
  )
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
