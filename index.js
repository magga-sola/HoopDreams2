
const ApolloServer = require('apollo-server').ApolloServer;
const resolvers = {};



const typeDefs = require('./schema');
console.log(typeDefs);

const server = new ApolloServer({
    typeDefs,
    resolvers
});


server
    .listen()
    .then(({ url }) => console.log(`GraphQL Service is running on ${ url }`));
