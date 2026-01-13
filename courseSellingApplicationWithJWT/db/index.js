const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://anaizafatima991_db_user:Tp8W3XpeHfVD2ZdK@cluster0.vihzt9u.mongodb.net/DatabaseWithAuthentication")

const adminSchema = new mongoose.Schema({
    username : String , 
    password : String 
})

const courseSchema = new mongoose.Schema({
    title : String ,
    description : String , 
    price : Number ,
    imageLink : String
})

const userSchema = new mongoose.Schema({
    username : String ,
    password : String , 
    purchasedCourses : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Courses'
    }]
})

const Admin = mongoose.model('Admin' , adminSchema) 
const Course = mongoose.model('Course' , courseSchema)
const User = mongoose.model('User' , userSchema)

module.exports = {
    Admin , 
    Course ,
    User
}