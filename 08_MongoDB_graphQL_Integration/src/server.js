


const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const connectToDB = require('./databases/db')

async function startServer() {
   await  connectToDB()
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })
    const {url} = await startStandaloneServer(server ,{
        listen :{port:4002}
    })
    console.log(`Server reasy at ${url}`)
}
startServer()