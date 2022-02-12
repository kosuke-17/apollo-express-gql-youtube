import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Post {
    id: ID
    title: String
    description: String
  }
  type Query {
    hello: String

    getAllPosts: [Post]
  }
`;
