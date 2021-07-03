import mongodb from "mongodb";
import dotenv from "dotenv";

import { UsersDAO } from "./dao";

import app from "./server";
dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT_API || 3001;

MongoClient.connect(`${process.env.MONGO_DB_URL}`, {
  poolSize: 50,
  wtimeout: 2500,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await UsersDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Port running: ${port}`);
    });
  });
