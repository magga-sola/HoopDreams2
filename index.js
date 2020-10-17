
const ApolloServer = require('apollo-server').ApolloServer;
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const db = require("./data/db").connection;


const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    // were connected!
    console.log("✔️ Connected to MongoDB ✔️");

    server
        .listen({
            port: process.env.PORT || 4000
        })
        .then(({ url }) => {
            console.log(`Server started at ${url}`);
        });
});