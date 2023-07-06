import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// import { typeDefs } from "./Schema";
const typeDefs = `#graphql
  type Memo {
    id: ID!
    content: String!
    user: User!
    like: [Like]!
    likeNum: Int!
  }

  
  type User {
    id: ID!
    name: String!
    grant: Grant!
    memos: [Memo]!
  }

  type Like {
    id: ID!
    likeUser: User!
    memoId: ID!
    date: String!
  }

  enum Grant {
    RED
    GREEN
    BLUE
  }

  
  type Query {
    memos: [Memo]
    users: [User]
  }
`;

const memos = [
  {
    id: "1",
    content: "content1",
    userId: "1",
    likeNum: 1,
  },
  {
    id: "2",
    content: "content1",
    userId: "2",
    likeNum: 2,
  },
];
const users = [
  {
    id: "1",
    name: "name1",
    grant: "RED",
  },
  {
    id: "2",
    name: "name2",
    grant: "GREEN",
  },
];

// The branch field of a book indicates which library has it in stock
const likes = [
  {
    id: "1",
    likeUserId: "1",
    memoId: "1",
    date: "2021",
  },
  {
    id: "2",
    likeUserId: "2",
    memoId: "1",
    date: "2021",
  },
  {
    id: "3",
    likeUserId: "2",
    memoId: "2",
    date: "2021",
  },
  {
    id: "4",
    likeUserId: "1",
    memoId: "2",
    date: "2021",
  },
  {
    id: "5",
    likeUserId: "1",
    memoId: "1",
    date: "2021",
  },
];

// Resolver map
const resolvers = {
  Query: {
    memos() {
      return memos;
    },
    users() {
      return users;
    },
    // likes() {
    //   return likes;
    // },
  },
  Memo: {
    user(parent) {
      return users.find((user) => user.id === parent.userId);
    },
    like(parent) {
      return likes.filter((like) => like.memoId === parent.id);
    },
  },
  User: {
    memos(parent) {
      return memos.filter((memo) => memo.userId === parent.id);
    },
  },
  Like: {
    likeUser(parent) {
      return users.find((user) => user.id === parent.likeUserId);
    },
  },
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
