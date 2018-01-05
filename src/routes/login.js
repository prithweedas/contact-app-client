import React from "react"
import { List, Form, Message, Container } from "semantic-ui-react"
import { extendObservable } from "mobx"
import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

class Login extends React.Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      email: "",
      password: "",
      passwordError: false,
      emailError: false,
      errorList: []
    })
  }

  onSubmit = async e => {
    this.errorList = []
    const { email, password } = this
    const response = await this.props.mutate({
      variables: { email, password }
    })

    const { ok, errors, token, refreshToken } = response.data.login

    if (ok) {
      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refreshToken)
      this.props.history.push("/")
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
    document.title = "Login"
    return (
      <Container style={{ width: "50vw", paddingTop: "10vh" }}>
        <Message attached header="Login" />
        <Form className="attached fluid segment">
          <Form.Input
            name="email"
            label="Email"
            type="email"
            value={this.email}
            placeholder="Email.."
            error={!!this.emailError}
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
              Login
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
          New on this site? <Link to="/register">Register here</Link> instead.
        </Message>
      </Container>
    )
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        message
        path
      }
    }
  }
`

export default graphql(loginMutation)(observer(Login))
