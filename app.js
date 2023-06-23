import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "backendapi",
  })
  .then((c) => console.log(`Database Connected with ${c.connection.host}`))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("<p>some html</p>");
});

app.listen(3000, () => {
  console.log("Server is running");
});
