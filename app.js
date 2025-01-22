const express = require('express')
const app = express()
const cookie = require("cookie-parser")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const cookieParser = require('cookie-parser')
const userModel = require("./models/users")
let secret_key = 'meet!@*1001'

app.use(express.json())

app.use(express.urlencoded({extended:true}));

app.set('view engine' , 'ejs');

app.use(express.static(path.join(__dirname , 'public')));

app.use(cookieParser())

app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/create",(req,res)=>{

    bcrypt.genSalt(15,(err,salt)=>{
        bcrypt.hash(req.body.psw , salt , async (err,result)=>{
            let createdUser = await userModel.create({
                username : req.body.uname,
                email : req.body.email,
                password : result,
                age : req.body.age
            })
            let token = jwt.sign({email : req.body.email} , secret_key)
            res.cookie("cookie",token);  
          
            res.redirect("/login") 
            })
           
        })
    })

app.get("/logout",(req,res)=>{
    res.cookie("token",'')
    res.redirect("/");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/logincheck",async (req,res)=>{
    let getuser = await userModel.findOne({email : req.body.email})
    if(!getuser)
    {
        res.send("Somethiing Went Wrong..")
    }
    else{
        bcrypt.compare(req.body.psw , getuser.password,(err,resultt)=>{
            if(resultt){
                res.send("Successfully")
            }
            else{
                res.send("Something Went Wrong..")
            }
           
        });
    }
 
    
})

app.listen(3000)


