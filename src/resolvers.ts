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
      _parent: any,
      args: { post: { title: string; description: string } },
      _context: any,
      _info: any
    ) => {
      // 引数のargsはpostの中に存在している
      const { title, description } = args.post;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },
    deletePost: async (
      _parent: any,
      args: { id: any },
      _context: any,
      _info: any
    ) => {
      const { id } = args;
      await Post.findByIdAndDelete(id);
      // const res = await Post.findByIdAndDelete(id);
      // console.dir(res);
      // resの中身
      // model {
      //   '$__': InternalCache {
      //     activePaths: StateMachine {
      //       paths: [Object],
      //       states: [Object],
      //       stateNames: [Array]
      //     },
      //     strictMode: true,
      //     skipId: true,
      //     _id: ObjectId { [Symbol(id)]: [Buffer [Uint8Array]] }
      //   },
      //   '$isNew': false,
      //   _doc: {
      //     _id: ObjectId { [Symbol(id)]: [Buffer [Uint8Array]] },
      //     title: '2回目のタイトル',
      //     description: '2回目の内容',
      //     __v: 0
      //   }
      // }

      return "削除完了!!";
    },
    updatePost: async (
      _parent: any,
      args: { post?: any; id?: any },
      _context: any,
      _info: any
    ) => {
      const { id } = args;
      const { title, description } = args.post;
      const updates = { title: "", description: "" };
      if (title !== undefined) {
        updates.title = title;
      }
      if (description !== undefined) {
        updates.description = description;
      }
      // からだったらnullに更新されないようにupdatesを作成s
      const post = await Post.findByIdAndUpdate(id, updates, { new: true });
      return post;
    },
  },
};

// delete実行後
// {
//   "data": {
//     "deletePost": "削除完了!!"
//   }
// }
// update実行後
// {
//   "data": {
//     "updatePost": {
//       "id": "62072ca6b1d8b124a1ba0392",
//       "title": "初めてのタイトル",
//       "description": "初めての内容"
//     }
//   }
// }
