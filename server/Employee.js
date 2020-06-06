const mongoose=require("mongoose")     //it is used to create schema and connect to database

const EmployeeSchema=new mongoose.Schema({
    
    name:String,
    email:String,
    phone:String,
    picture:String
})
mongoose.model("employee",EmployeeSchema) //any name  