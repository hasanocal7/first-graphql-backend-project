import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const messages =
  {
    id: "nqycUt8Hc5n9HG1",
    title: "Merhabalar!",
    sendBy: {
      id: "WM53LspqgL3nBTE",
      fullname: "Ali Efe"
    }
  }

const users = [
  {
    id: "QGvgAqotfDHLvvH",
    fullname: "Hasan ÖCAL",
    messages: messages
  }
];

const typeDefs = `#graphql
  
  type Message {
  id: ID!,
  title: String!
  sendBy: User 
  }

  type User {
    id: ID!,
    fullname: String!,
    messages: Message!
  }

  type Query {
    users: [User],
    messages: [Message]
  }
`;

// Non-Nullable Fields => ! Example: title: String!

// ID, Int, Float => SCALAR TYPES

const resolvers = {
    Query: {
        users: () => users,
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
