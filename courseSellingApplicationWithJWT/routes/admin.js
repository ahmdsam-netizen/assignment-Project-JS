const express = require("express")
const jwt = require("jsonwebtoken") 
const adminMiddlewares = require("../middlewares/admin")
const { Admin , Course } = require("../db")
const router = express.Router()
const app = express()
const jwtPassword = "123" 


router.post("/signup" , async (req , res) => {
    const username = req.body.username
    const password = req.body.password

    const findUser = await Admin.findOne({username : username})
    if(findUser){
        return res.json({
            "message" : "Admin already exists"
        })
    }
    await Admin.create({
        username : username , 
        password : password 
    })
    res.json({
        "message" : "Admin created successfully"
    })
})

router.post("/signin"  , async (req , res) => {
    const username = req.body.username 
    const password = req.body.password

    const findUser = await Admin.findOne({username : username , password : password})
    if(!findUser){
        return res.json({
            "message" : "Admin does not exists"
        })
    }
    const token = jwt.sign(username , jwtPassword)
    res.json({
        "token" : token
    })
})

router.post("/courses" , adminMiddlewares , async (req , res) => {
    const curCourse = await Course.create({
        title : req.body.title ,
        description : req.body.description ,
        price : req.body.price ,
        imageLink : req.body.imageLink
    })
    res.json({
        "message" : "Course has been created successfully" , 
        "courseId" : curCourse._id 
    })
})

router.get("/courses" , adminMiddlewares , async (req , res) => {
    const courses = await Course.find({})
    res.json({
        "courses" : courses
    })
})

module.exports = router