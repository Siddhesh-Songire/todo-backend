import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "backendapi",
  })
  .then((c) => console.log(`Database Connected with ${c.connection.host}`))
  .catch((e) => console.log(e));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<p>some html</p>");
});

app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running");
});
