import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { messages, users } from './data/db.js';

const typeDefs = `#graphql
  
  type Message {
  id: ID!
  message: String!
  sendBy: User
  sendBy_id: ID!
  getBy_id: ID!
  getBy: User
  }

  type User {
    id: ID!
    fullname: String
    messages: [Message]
  }

  type Query{
    users: [User]
    message(id: String!): Message
    messages: [Message]
    user(id: Int!): User
  }
`;

// Non-Nullable Fields => ! Example: title: String!

// ID, Int, Float => SCALAR TYPES

const resolvers = {
    Query: {
        users: () => users,
        message: (parent, args) => {
          const data = messages.find((message) => message.id === args.id);
          return data;
        },
        messages: () => messages,
        user: (parent, args) => {
          const data = users.find((user) => user.id === args.id);
          return data;
        }
    },

    Message: {
      sendBy: (parent) => {
        return users.find(user => user.id === parent.sendBy_id)
      },
      getBy: (parent) => {
        return users.find(user => user.id === parent.getBy_id)
      }
    },

    User: {
      messages: (parent) => {
          return messages.filter(message => message.sendBy_id === parent.id || message.getBy_id === parent.id)
        }
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
