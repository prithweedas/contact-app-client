import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { setContext } from "apollo-link-context"
import { ApolloLink, split } from "apollo-link"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"

const httpLink = createHttpLink({ uri: "http://localhost:3001/graphql" })

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3001/subscriptions`,
  options: {
    reconnect: true
  }
})

const middlewareLink = setContext(() => ({
  headers: {
    "x-token": localStorage.getItem("token"),
    "x-refresh-token": localStorage.getItem("refreshToken")
  }
}))

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext()
    const { response: { headers } } = context

    if (headers) {
      const token = headers.get("x-token")

      if (token) {
        localStorage.setItem("token", token)
      }
      const refreshToken = headers.get("x-refresh-token")

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken)
      }
    }
    return response
  })
})

const linkWithMiddleWare = afterwareLink.concat(middlewareLink.concat(httpLink))

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === "OperationDefinition" && operation === "subscription"
  },
  wsLink,
  linkWithMiddleWare
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
