import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./Schema.graphql";

const memos = [
  {
    id: "content1",
    content: "content1",
    likeNum: 1,
  },
  {
    id: "content2",
    content: "content2",
    likeNum: 2,
  },
];
const users = [
  {
    id: "user1",
    name: "name1",
  },
  {
    id: "user2",
    name: "name2",
  },
];

// The branch field of a book indicates which library has it in stock
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
    branch: "riverside",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    branch: "downtown",
  },
  {
    title: "City of test",
    author: "test",
    branch: "downtown",
  },
  {
    title: "City of test2",
    author: "test2",
    branch: "downtown",
  },
  {
    title: "City of test",
    author: "test",
    branch: "test",
  },
];

// Resolver map
const resolvers = {
  Query: {
    memos() {
      return memos;
    },
    users() {
      return memos;
    },
  },
  Memo: {
    user(parent) {
      return books.filter((book) => book.branch === parent.branch);
    },
  },
  Book: {
    // The parent resolver (Library.books) returns an object with the
    // author's name in the "author" field. Return a JSON object containing
    // the name, because this field expects an object.
    author(parent) {
      return {
        name: parent.author,
      };
    },
  },

  // Because Book.author returns an object with a "name" field,
  // Apollo Server's default resolver for Author.name will work.
  // We don't need to define one.
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
