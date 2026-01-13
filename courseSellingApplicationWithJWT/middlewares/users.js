const jwt = require("jsonwebtoken")
const jwtPassword = "123"

function userMiddlewares(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" })
  }

  try {
    const token = authHeader.split(" ")[1] || authHeader
    const decoded = jwt.verify(token, jwtPassword)

    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" })
  }
}

module.exports = userMiddlewares
