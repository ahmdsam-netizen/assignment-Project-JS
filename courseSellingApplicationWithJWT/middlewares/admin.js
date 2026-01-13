const jwt = require("jsonwebtoken")
const jwtPassword = "123"

function adminMiddlewares(req , res , next){
    try{
        const result = jwt.verify(req.headers.authorization , jwtPassword)
    } catch(err){
        return res.json({
            "message" : "Error 404 . Bad request"
        })
    }
    next() ; 
}

module.exports = adminMiddlewares