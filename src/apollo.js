import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { setContext } from "apollo-link-context"
import { ApolloLink } from "apollo-link"

const httpLink = createHttpLink({ uri: "http://localhost:3001/graphql" })

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

const link = afterwareLink.concat(middlewareLink.concat(httpLink))

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client
