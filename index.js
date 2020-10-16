
const ApolloServer = require('apollo-server').ApolloServer;
const resolvers = {};
const typeDefs = require('./schema');
const DB = require('./data/db');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => ({
        db:DB
    })
});


server
    .listen()
    .then(({ url }) => console.log(`GraphQL Service is running on ${ url }`));