import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 4000 || process.env.PORT;
  const mongo: string = process.env.MONGO_URI || "";

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

  await mongoose.connect(mongo);
  console.log("MongoDB接続完了");

  app.listen(PORT, () => console.log(`ポート${PORT}番起動中`));
}
startServer();
