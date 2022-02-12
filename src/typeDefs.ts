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
    getPost(id: ID): Post
  }

  # 実行クエリ
  # query query {
  # // 全ての記事を取得
  #   getAllPosts {
  #     id
  #     title
  #     description
  #   }
  # // IDに紐づく記事を取得
  # getPost(id:"62072ca6b1d8b124a1ba0392") {
  #   title
  #   description
  # }
  # }

  # mutationで必要な引数の型
  input PostInput {
    title: String
    description: String
  }

  type Mutation {
    createPost(post: PostInput): Post
    deletePost(id: ID): String
    # updatePost(post: PostInput): Post
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
