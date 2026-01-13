const express = require("express")
const jwt = require("jsonwebtoken") 
const userMiddlewares = require("../middlewares/users")
const { User , Course } = require("../db")
const { mongo, default: mongoose } = require("mongoose")
const router = express.Router()
const app = express()
const jwtPassword = "123" 


router.post("/signup" , async (req , res) => {
    const username = req.body.username
    const password = req.body.password

    const findUser = await User.findOne({username : username})
    if(findUser){
        return res.json({
            "message" : "User already exists"
        })
    }
    await User.create({
        username : username , 
        password : password 
    })
    res.json({
        "message" : "User created successfully"
    })
})

router.post("/signin"  , async (req , res) => {
    const username = req.body.username 
    const password = req.body.password

    const findUser = await User.findOne({username : username , password : password})
    if(!findUser){
        return res.json({
            "message" : "User does not exists"
        })
    }
    const token = jwt.sign(username , jwtPassword)
    res.json({
        "token" : token
    })
})

router.get("/courses" , async (req , res) => {
    const courses = await Course.find({})
    res.json({
        "courses" : courses
    })
})

router.post("/courses/:courseId" , userMiddlewares , async (req , res) => {
    const getUserName = req.user.username
    const getId = req.params.courseId 
    await User.updateOne({username : getUserName} , {
        "$push" : {
            purchasedCourses : getId
        }
    })
    res.json({
        "message" : "Course purchased successfully"
    })
})

router.get("/purchasedCourses" , userMiddlewares , async (req , res) => {
    const getUserName = req.username
    const user = await User.findOne({username : username})
    res.json({
        "purchasedCourses" : user.purchasedCourses
    })
})

module.exports = router