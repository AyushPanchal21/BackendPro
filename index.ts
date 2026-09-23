import express from "express";
import type { Request, Response } from "express";
import { DBConnect } from './src/service/DataBaseConnection.js'
import { createUser } from "./src/Domain/usecase/CreateUser.js";
import { loginUser } from "./src/Domain/usecase/LoginUser.js";
import { loginOrg } from "./src/Domain/usecase/LoginOrg.js";
import { createorg } from "./src/Domain/usecase/CreateOrg.js"
import { createproject } from "./src/Domain/usecase/CreateProject.js";
import { createapplication } from "./src/Domain/usecase/CreateApplication.js";
import { checkApplication } from "./src/Domain/usecase/CheckApplication.js";
import { getapplication } from "./src/Domain/usecase/GetApplicationForOrganization.js"
import Jwt from "jsonwebtoken";
import { createtask } from "./src/Domain/usecase/CreateTask.js";
import { checktask } from "./src/Domain/usecase/CheckTask.js";
import { getproject } from "./src/Domain/usecase/AddMembersToProject.js"
import {gettask} from "./src/Domain/usecase/AddMmebersToTask.js"
import { deletetask } from "./src/Domain/usecase/DeleteMemberFromTask.js";
import { deleteproject } from "./src/Domain/usecase/DeleteMemberFromProject.js";
import { OrgAuth } from "./src/Presentation/Middleware/OrgAuthMiddleWare.js";
import dotenv from "dotenv";


dotenv.config();

const app = express()
app.use(express.json())
const PORT = process.env.PORT;
const key = process.env.SECRETKEY || ""

DBConnect();

app.post("/create-user", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    const result = await createUser.execute({
      name,
      email,
      password
    })
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
    const { email, password} = req.body
    const result = await loginUser.execute(
      email,
      password
    )
    if (!result.status || !result.user) {
      return res.status(401).json(result);
    }
    const jwttoken = Jwt.sign(
      {
        userId: result.user,
      },
      key
    )
    return res.status(201).json({ message: "logged in", usertoken: jwttoken });
  } catch (err) {
    console.log(err)
  }
})

app.post("/create-org", async (req: Request, res: Response) => {
  try {
    const { email, password, orgName } = req.body;

    const orgResult = await createorg.execute({
      email,
      password,
      orgName,
    });

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
    const { email, password, id } = req.body
    const result = await loginOrg.execute(
      email,
      password
    )
    if (!result.status || !result.user) {
      return res.status(401).json(result);
    }

    const jwttoken = Jwt.sign(
      {
        orgId: id,
      },
      key
    )
    return res.status(201).json({ message: "logged in", orgtoken: jwttoken });
  } catch (err) {
    console.log(err)
  }
})

app.post("/organizatoin/apply", OrgAuth, async (req: Request, res: Response) => {

    const { orgid, role, experience } = req.body;

    if (!req.user) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized"
        });
    }

    const userid = req.user.userId;

    const check = await checkApplication.execute({
        userid,
        orgid
    });

    if (check.status === false) {
        return res.status(400).json({
            status: false,
            message: "User has already applied"
        });
    }

    const result = await createapplication.execute({
        orgid,
        userid,
        role,
        experience
    });

    return res.status(201).json(result);
});

app.post("/organization/get-applications", async (req: Request, res: Response) => {
  const { orgid } = req.body;
  const result = await getapplication.execute({
    orgid
  })
  return res.status(201).json({
    results: result
  })
})

app.post("/create-project", async (req: Request, res: Response) => {
  try {
    const { orgid, proName, description, allMem = [] } = req.body;

    const projectResult = await createproject.execute({
      orgId: orgid,
      proName: proName,
      description: description,
      allMem: allMem,
    });

    if (!projectResult.status) {
      return res.status(409).json(projectResult);
    }

    return res.status(201).json(projectResult);

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

app.post("/create-task", async (req: Request, res: Response) => {
  try {
    const { title, projectId, orgId, due } = req.body;

    const check = await checktask.execute({
      projectId,
      title
    })

    if (check.status == false) {
      return res.status(400).json({
        status: false,
        message: "Task already exists"
      })
    }

    else {
      const taskResult = await createtask.execute({
        title,
        projectId,
        orgId,
        due
      })

      if (!taskResult.status) {
        return res.status(409).json(taskResult);
      }

      return res.status(201).json(taskResult);
    }


  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

app.post("/addmembers-toproject", async (req: Request, res: Response) => {
  try {
    const { id,members } = req.body

    const resutl = await getproject.execute(id,members)
    console.log(resutl);
    

    if(resutl.success === false || null ){
      return res.json({message:"there was a problem adding the member"})
    }
    else{
      return res.json({message:"members added successfully"})
    }

  } catch (err) {
    console.log(err)
  }
}) 

app.post("/addmembers-totask",async(req:Request,res:Response)=>{
  try{
    const {taskid,members} = req.body
    const result = await gettask.execute(
      taskid,members
    )
    if(result.success == false || null){
      return res.json({message:"there was a problem adding the member"})
    }
    else{
      return res.json({message:"members added successfully"})
    }
  }catch(err){
    console.log(err)
  }
}) 

app.post("/deletemember-from-task",async(req:Request,res:Response)=>{
  const {taskid,userid} = req.body

  const result = await deletetask.execute(taskid,userid)
  if(result.success == false || null){
    return res.json({message:"problem removing members or no such task is there"})
  }
  else{
      return res.json({message:"removed the members"})
  }
})

app.post("/deletemembers-fromproject",async(req:Request,res:Response)=>{
  try{
    const {projectid,userid} = req.body

    const result = await deleteproject.execute(projectid,userid)
    console.log(result)
    if(result.success == false || null){
      return res.json({message:"problem removing member or such project or user does not exists"})
    }
    else{
      res.json({message:"remove the user from project"})
    }
  }catch(err){console.log(err)}
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})