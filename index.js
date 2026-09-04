import express from 'express'

const app = express()

app.post("/login-user", (req, res) => {
  const { email, password } = req.body;
  // const user = await findOne({ email })
  if (user) {
    // return jwt 
  }
  else {
    return res.status().json({ success: false, message: "no such user" })
  }
})
app.post("/login-organization", (req, res) => { })

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`) // undefined
})