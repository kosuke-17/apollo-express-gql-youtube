import { Post } from "./models/Post.model";
export const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    getAllPosts: async () => {
      return await Post.find();
    },
    // _は利用しないという意味
    getPost: async (_p: any, { id }: any, _c: any, _i: any) => {
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (
      parent: any,
      args: { post: { title: string; description: string } },
      context: any,
      info: any
    ) => {
      // 引数のargsはpostの中に存在している
      const { title, description } = args.post;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },
  },
};
