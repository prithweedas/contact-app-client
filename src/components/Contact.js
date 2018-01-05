import React from "react"
import { Card, Image } from "semantic-ui-react"

const Contact = ({ name, email, phone }) => {
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="http://localhost:3001/static/images/steve.jpg"
        />
        <Card.Header>{name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>{phone}</Card.Meta>
        <Card.Meta>{email}</Card.Meta>
      </Card.Content>
    </Card>
  )
}

export default Contact
