import React, { Component } from "react"
import { Form, Container, Message, Header } from "semantic-ui-react"
import { extendObservable } from "mobx"
import { observer } from "mobx-react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

class CreateContact extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      name: "",
      email: "",
      phone: "",
      error: false
    })
  }

  onSubmit = async e => {
    const { email, name, phone } = this
    console.log(email, name, phone)
    const response = await this.props.mutate({
      variables: { name, email, phone }
    })
    const { ok, errors } = response.data.createContact
    if (ok) {
      this.name = ""
      this.email = ""
      this.phone = ""
      this.error = false
    } else {
      this.error = true
    }
  }

  onChange = e => {
    const { name, value } = e.target
    this[name] = value
  }

  render() {
    return (
      <Container style={{ height: "100%" }}>
        <Message attached header="Create Contact" />
        <Form className="attached fluid segment">
          <Form.Input
            name="name"
            label="Name"
            type="text"
            value={this.name}
            placeholder="Name.."
            onChange={this.onChange}
          />

          <Form.Input
            name="email"
            placeholder="Email.."
            label="Email.."
            type="email"
            value={this.email}
            onChange={this.onChange}
          />
          <Form.Input
            name="phone"
            placeholder="Phone No."
            label="Phone No."
            type="text"
            value={this.phone}
            onChange={this.onChange}
          />
          <div style={{ textAlign: "center" }}>
            <Form.Button onClick={this.onSubmit} color="blue">
              Create
            </Form.Button>
          </div>
        </Form>
        {this.error && (
          <Message attached="bottom" warning>
            <Header as="h3">Oops! Something went Wrong..</Header>
          </Message>
        )}
      </Container>
    )
  }
}

const createContactMutation = gql`
  mutation($name: String!, $email: String!, $phone: String!) {
    createContact(name: $name, email: $email, phone: $phone) {
      ok
      errors {
        path
        message
      }
    }
  }
`

export default graphql(createContactMutation)(observer(CreateContact))
