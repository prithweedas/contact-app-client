import React from "react"
import { List, Form, Message, Container } from "semantic-ui-react"
import { extendObservable } from "mobx"
import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

class Register extends React.Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      username: "",
      email: "",
      password: "",
      usernameError: false,
      passwordError: false,
      emailError: false,
      errorList: []
    })
  }

  onSubmit = async e => {
    this.errorList = []
    const { username, email, password } = this
    const response = await this.props.mutate({
      variables: { username, email, password }
    })

    const { ok, errors } = response.data.register

    if (ok) {
      this.props.history.push("/login")
    } else {
      errors.forEach(({ path, message }) => {
        this[`${path}Error`] = true
        this.errorList.push({ path, message })
      })
    }
  }
  onChange = e => {
    const { name, value } = e.target
    this[name] = value
  }

  render() {
    document.title = "Register"
    return (
      <Container style={{ width: "50vw", paddingTop: "10vh" }}>
        <Message
          attached
          header="Register to our site"
          content="Fill out the form below to sign-up for a new account"
        />
        <Form className="attached fluid segment">
          <Form.Input
            name="email"
            label="Email"
            placeholder="Email.."
            type="text"
            value={this.email}
            error={!!this.emailError}
            onChange={this.onChange}
          />
          <Form.Input
            name="username"
            label="Username"
            placeholder="Username"
            type="text"
            value={this.username}
            error={!!this.usernameError}
            onChange={this.onChange}
          />
          <Form.Input
            name="password"
            placeholder="Password"
            label="Password"
            type="password"
            value={this.password}
            error={!!this.passwordError}
            onChange={this.onChange}
          />
          <div style={{ textAlign: "center" }}>
            <Form.Button onClick={this.onSubmit} color="blue">
              Register
            </Form.Button>
          </div>
        </Form>
        {this.errorList.length > 0 && (
          <Message attached="bottom" warning>
            <List>
              {this.errorList.map(error => {
                return <List.Item key={error.path}>{error.message}</List.Item>
              })}
            </List>
          </Message>
        )}
        <Message warning>
          Already signed up? <Link to="/login">Login here</Link> instead.
        </Message>
      </Container>
    )
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        message
        path
      }
    }
  }
`

export default graphql(registerMutation)(observer(Register))
