const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { ApolloServer, gql } = require('apollo-server-express')
const http = require('http')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { generatePeople  } = require('./generate-people')

const PEOPLE = generatePeople()

const typeDefs = gql`
  type Person {
    name: String
    address: String
    email: String
    phone_number: String
  }

  type Query {
    people(skip: Int): [Person]
  }
`


const resolvers = {
  Query: {
    people: (parent, args, context, info) => {
      const skip = args.skip ?? 0
      if(skip >= 2000) {
        return []
      }
      return PEOPLE.slice(skip, skip + 20)
    },
  },
}


async function startApolloServer(typeDefs, resolvers) {
  const app = express()
  app.use(cors())
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  })

  await server.start()
  server.applyMiddleware({ app })
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}


startApolloServer(typeDefs, resolvers)

