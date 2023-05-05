import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/auth",userRouter);
app.use("/recipes", recipeRouter);

mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

app.get("/" , (req,res) => {
    res.send("hello world");
})

app.listen(process.env.PORT, ()=> {
    console.log("server running");
})