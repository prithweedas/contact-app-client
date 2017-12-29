import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

const link = createHttpLink({ uri: "http://localhost:3001/graphql" })

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client
