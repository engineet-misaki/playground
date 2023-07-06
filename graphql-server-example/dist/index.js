import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";
import { RESTDataSource } from "apollo-datasource-rest";
class jsonPlaceAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://jsonplaceholder.typicode.com/";
    }
    async getUsers() {
        const data = await this.get("/users");
        return data;
    }
    async getUser(id) {
        const data = await this.get(`/users/${id}`);
        return data;
    }
    async getPosts() {
        const data = await this.get("/posts");
        return data;
    }
}
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
type User {
  id: ID!
  name: String!
  email: String!
  myPosts: [Post]
}

type Post {
  id: ID!
  title: String!
  body: String!
  userId: ID!
}

type Query {
  hello(name: String!): String
  users: [User]
  user(id: ID!): User
  posts: [Post]
}
`;
const users = [
    { id: "1", name: "John Doe", email: "john@test.com" },
    { id: "2", name: "Jane Doe", email: "jane@example.com" },
];
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        hello: (parent, args) => `Hello ${args.name}`,
        users: async () => {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            return response.data;
        },
        user: async (parent, args) => {
            let response = await axios.get(`https://jsonplaceholder.typicode.com/users/${args.id}`);
            return response.data;
        },
        posts: async (_, __, contextValue) => {
            return contextValue.dataSources.jsonPlaceAPI.getPosts();
        },
    },
    User: {
        myPosts: async (parent) => {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
            const myPosts = response.data.filter((post) => post.userId == parent.id);
            return myPosts;
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
    context: async () => {
        return {
            dataSources: {
                jsonPlaceAPI: new jsonPlaceAPI(),
            },
        };
    },
});
console.log(`🚀  Server ready at: ${url}`);
