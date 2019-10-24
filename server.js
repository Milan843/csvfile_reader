const express=require('express')
const app=express()
const validator=require('validator')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
var userlist=require("./try")
// console.log(typeof(userlist))

// console.log('ye funct ',userlist)
app.set('view engine','hbs')


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/app',(req,res)=>{
  console.log(userlist,"here")
    res.render('index', {
       userlist
     })
    })
app.get('/',(req,res)=>{
    res.send("please go to /app")
})
app.post("/app",(req,res)=>{

    console.log(req.body.phone_no)
    if(validator.isEmail(req.body.email )&& validator.isMobilePhone(req.body.phone_no)){
    userlist.push({
        name:req.body.name,
        email:req.body.email,
        phone_no:req.body.phone_no
      })}
    // userlist.name=req.body.name;
    // userlist.email=req.body.email;
    // userlist.phone_no=req.body.phone_no;
    // console.log(userlist)

    // userlist.forEach(element => {
    //     validator.isEmail(userlist.email)
        
    // });

    res.redirect('/app')
})


MongoClient.connect(url, {useNewUrlParser: true , useUnifiedTopology: true} ,function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    
    dbo.collection("users").insertMany(userlist, function(err, res) {
      if (err) throw err;
      console.log("Number of User inserted: " + res.insertedCount);
      db.close();
    });
  });
// app.use('/app',routes.mongo)
app.listen(8045,()=>{
    console.log("server started")
})
// module.exports=userlist
