const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");


mongoose.connect("mongodb://localhost:27017/test13", { useNewUrlParser: true });

const User = mongoose.model("user", { name: String, bookIds: [Number] });

const typeDefs = gql`
  
  type User {
    id: ID!
    name: String!
    books: [Book!]!
  }
  type Query {
    users: [User]
  }
  type Mutation {
    createUser(name: String!): User
  }
`;

const resolvers = {
    Mutation: {
        createUser: async (_, { name }) => {
            const user = new User({ name, bookIds: [] });
            await user.save();
            return user;
        }
        },
    Query: {
        users: () => User.find()
    }

};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});