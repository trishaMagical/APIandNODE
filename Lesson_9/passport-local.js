const { doesNotMatch } = require("assert");
let express = require("express");
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
 let {users,orders} = require("./data-2.js")
let app = express();;
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept"
    );
    next();
});
app.use(passport.initialize());
const port =2410;
app.listen(port,()=>console.log(`Node app Listening on port ${port}!`));

let strategyAll = new LocalStrategy(function(username,password,done){
    console.log("In LocalStrategy", username, password);
    let user = users.find((u)=> u.name===username && u.password=== password);
    if (!user)
    return done(null,false,{message:"Incorrect username or password"});
    else return done(null,user);

});
let strategyAdmin = new LocalStrategy(function(username,password,done){
    console.log("In LocalStrategy", username, password);
    let user = users.find((u)=> u.name===username && u.password=== password);
    if (!user)
    return done(null,false,{message:"Incorrect username or password"});
   else if(user.role!="admin")
   return done(null,false,{message:"you do not have admin role"});
   
    else return done(null,user);

});
passport.use("roleAll",strategyAll);
passport.use("roleAll",strategyAdmin);
app.post("/user",function(req,res){
    let {username,password}= req.body;
    let user = users.find((u)=> u.name===username && u.password=== password);
    if(user){
        let payload ={ id: user.id};
        res.send(payload);
    } 
    else if(user.role !=="admin")
    return done(null,false,{message:"you dont have admin role"});
    else res.sendStatus(401);
});
 app.get("/user", passport.authenticate("roleAll",{session:false}),function(req,res){
    console.log("In GET /user", req.user);
    res.send(req.user);
 });
 app.get("/myOrders", passport.authenticate("roleAll",{session:false}),function(req,res){
    console.log("In GET /myOrders", req.user);
    let orders1 = orders.filter((ord)=>ord.userId === req.user.id)
    res.send(orders1);
 });
 app.get("/allOrders",passport.authenticate("roleAdmin",{session:false}),function(req,res){
    Console.log("In GET /myOrders", req.user);
    
    res.send(orders);
 });