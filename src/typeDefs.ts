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

  # mutationで必要な引数の型
  input PostInput {
    title: String
    description: String
  }

  type Mutation {
    createPost(post: PostInput): Post
  }
`;

// mutation {
//   createPost(post: {
//       title:"初めてのタイトル"
//       description: "初めての内容"
//     }){
//       id
//       title
//       description
//     }
// }
