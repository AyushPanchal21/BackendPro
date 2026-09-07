import express from "express";
import type { Request, Response } from "express";
import { DBConnect } from './src/service/DataBaseConnection.js'
import dotenv from "dotenv";
import { createUser } from "./src/Domain/usecase/CreateUser.js";
import { loginUser } from "./src/Domain/usecase/LoginUser.js";

dotenv.config();

const app = express()
app.use(express.json())
const PORT = process.env.Port || 1221;

DBConnect();

app.post("/create-user", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    const result = await createUser.execute(
      name,
      email,
      password
    )
    if (!result.status) {
      return res.status(409).json(result);
    }
    return res.status(201).json(result);

  } catch (err) {
    console.log(err)
  }
})

app.post("/login-user", async (req: Request, res: Response) => {
  try{
    const {email,password} = req.body
    const result = await loginUser.execute(
      email,
      password
    )
    if (!result.status) {
      return res.status(409).json(result);
    }
    return res.status(201).json({message:"logged in"});
  }catch(err){
    console.log(err)
  }
})

app.post("/login-organization", async (req, res) => { })

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`) // undefined
})