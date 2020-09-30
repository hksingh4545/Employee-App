const express = require("express")
const app = express()
const bodyParser=require("body-parser")
const mongoose=require("mongoose")

require("./Employee") //name of the created schema .js

app.use(bodyParser.json())  //always create route(get,post) below this

const Employee=mongoose.model("employee") //name the  saved one in schema


const mongouri="mongodb+srv://XXX"

mongoose.connect(mongouri,{
        useNewUrlParser:true,   //to remove warning
        useUnifiedTopology:true
    })

    mongoose.connection.on("connected",()=>{
        console.log("conection is setup yeahhh")
    })
    mongoose.connection.on("error",(err)=>{
        console.log("error",err)
    })


app.get('/',(req,res)=>{
    Employee.find({}).   //this is to print all the  data
    then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.post('/send',(req,res)=>{
    const employ=new Employee({  //to create new field
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        picture:req.body.picture
    })
    employ.save()       //to save the data
    .then(data=>{
        console.log(data)
        res.send(data)  //response should be in json 
    }).catch(err=>{
        console.log(err)
    })
    
   
})
 
app.post('/delete',(req,res)=>{
        Employee.findByIdAndDelete(req.body.id)
        .then(data=>{
            console.log("data:",data)
            res.send(data)
        }).catch(err=>{
            console.log("error",err)
        })
})

app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        picture:req.body.picture
    }).then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.listen(3000,()=>{
    console.log("serer running ok")
})
