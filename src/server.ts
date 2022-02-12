import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
  },
};

async function startServer() {
  const app = express();
  const PORT = 4000 || process.env.PORT;
  // apolloServerをインスタンス化
  const apoloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  // apolloServerを起動
  await apoloServer.start();

  // ミドルウェアとしてexpressサーバーを活用し適応
  apoloServer.applyMiddleware({ app: app, path: "/truly" });

  app.use((req, res) => {
    res.send("Hello from express apollo server");
  });

  app.listen(PORT, () => console.log(`ポート${PORT}番起動中`));
}
startServer();
