import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: String!
    score: Float!
  }
  type Query {
    books: [Book]
  }
`;

// Non-Nullable Fields => ! Example: title: String!

// ID, Int, Float => SCALAR TYPES

const books = [
    {
      title: 'Tutunamayanlar',
      author: 'Oğuz Atay',
      score: 8.4
    },
    {
      title: 'Sefiller',
      author: 'Victor Hugo',
      score: 9.3
    },
    /* {
      title: null,
      author: null
    } => "errors": [
    {
      "message": "Cannot return null for non-nullable field Book.author.  */
];

const resolvers = {
    Query: {
        books: () => books,
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
