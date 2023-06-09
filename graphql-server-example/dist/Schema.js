// Schema definition
export const typeDefs = `#graphql
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
