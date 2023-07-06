// Schema definition
export const typeDefs = `

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
