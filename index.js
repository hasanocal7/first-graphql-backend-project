import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { messages, users } from './data/db.js';

const typeDefs = `#graphql
  
  type Message {
  id: ID!,
  message: String!
  sendBy: User 
  }

  type User {
    id: ID!,
    fullname: String,
    messages: [Message]
  }

  type Query{
    users: [User],
    message(fullname: String!): Message
    messages: [Message]
  }
`;

// Non-Nullable Fields => ! Example: title: String!

// ID, Int, Float => SCALAR TYPES

const resolvers = {
    Query: {
        users: () => users,
        message: (parent, args) => {
          const data = messages.find((message) => message.sendBy.fullname === args.fullname);
          return data;
        },
        messages: () => messages
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000},
});

console.log(`🚀  Server ready at: ${url}`)
