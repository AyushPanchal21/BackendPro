import express from "express";
import type { Request, Response } from "express";
import { DBConnect } from './src/service/DataBaseConnection.js'
import dotenv from "dotenv";
import { createUser } from "./src/Domain/usecase/CreateUser.js";
import { loginUser } from "./src/Domain/usecase/LoginUser.js";
import { loginOrg } from "./src/Domain/usecase/LoginOrg.js";
import { createorg } from "./src/Domain/usecase/CreateOrg.js"
import Jwt from "jsonwebtoken";

dotenv.config();

const app = express()
app.use(express.json())
const PORT = process.env.PORT;
const key = process.env.SECRETKEY || ""

DBConnect();

app.post("/create-user", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    const result = await createUser.execute(
      name,
      email,
      password
    )
    console.log(result)
    if (!result.status) {
      return res.status(409).json(result);
    }
    return res.status(201).json(result);

  } catch (err) {
    console.log(err)
  }
})

app.post("/login-user", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const result = await loginUser.execute(
      email,
      password
    )
    if (!result.status || !result.user) {
      return res.status(401).json(result);
    }
    const jwttoken = Jwt.sign(
      {
        orgId: result.user.id,
      },
      key
    )
    return res.status(201).json({ message: "logged in",orgtoken:jwttoken });
  } catch (err) {
    console.log(err)
  }
})

app.post("/create-org", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const orgResult = await createorg.execute(
      name,
      email,
      password
    );

    if (!orgResult.status) {
      return res.status(409).json(orgResult);
    }

    return res.status(201).json(orgResult);

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

app.post("/login-organization", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const result = await loginOrg.execute(
      email,
      password
    )
    if (!result.status || !result.user) {
      return res.status(401).json(result);
    }

    const jwttoken = Jwt.sign(
      {
        orgId: result.user.id,
      },
      key
    )
    return res.status(201).json({ message: "logged in",orgtoken:jwttoken });
  } catch (err) {
    console.log(err)
  }
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`) 
})