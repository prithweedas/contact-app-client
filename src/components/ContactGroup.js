import React, { Component } from "react"

import { Card } from "semantic-ui-react"

import Contact from "./Contact"

export default class ContactGroup extends Component {
  render() {
    const { contacts } = this.props
    return (
      <Card.Group>
        {contacts.length > 0 &&
          contacts.map(contact => (
            <Contact
              key={`contact-${contact.id}`}
              name={contact.name}
              email={contact.email}
              phone={contact.phone}
            />
          ))}
      </Card.Group>
    )
  }
}
