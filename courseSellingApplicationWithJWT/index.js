const express = require("express")
const app = express()

const adminRouter = require("./routes/admin")
const userRouter = require("./routes/users")

app.use(express.json())

app.use("/admin", adminRouter)
app.use("/users", userRouter)

const PORT = 3000
app.listen(PORT , () => {
  console.log("Server running on port 3000")
})
