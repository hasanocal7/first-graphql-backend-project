import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Book {
    title: String!
    author: String!
  }
  type Query {
    books: [Book]
  }
`;

// Non-Nullable Fields => ! Example: title: String!

const books = [
    {
      title: 'Tutunamayanlar',
      author: 'Oğuz Atay',
    },
    {
      title: 'Sefiller',
      author: 'Victor Hugo',
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
