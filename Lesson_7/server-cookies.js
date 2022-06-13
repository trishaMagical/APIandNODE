let express = require("express");
let app = express();
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
const port =2410;
app.listen(port,()=>console.log(`Node app Listening on port ${port}!`));
const cookieParser = require("cookie-parser") ;
app.use(cookieParser("abcdef-3477819"));
 let {laptops,mobiles,users} = require("./data.js");

 app.get("/mobiles",function(req,res){
    let userdata = req.signedCookies.userdata;
    console.log(`userdata: ${JSON.stringify(userdata)}`);
    if(!userdata) userdata= {user:"Guest",pages:[]};
    userdata.pages.push({url:"/mobiles",date:Date.now()});
    res.cookie("userdata",userdata,{maxAge:30000,signed: true});
    res.send(mobiles);
 });

 app.get("/laptops",function(req,res){
    let userdata = req.signedCookies.userdata;
    console.log(`userdata: ${JSON.stringify(userdata)}`);
    if(!userdata) userdata= {user:"Guest",pages:[]};
    userdata.pages.push({url:"/laptops",date:Date.now()});
    res.cookie("userdata",userdata,{maxAge:30000,signed: true});
    res.send(laptops);
 });
app.post("/login",function(req,res){
    let {name,password}= req.body;
    let user = users.find((u)=> u.name=== name && u.password=== password);
    if(!user)
    res.status(401).send ("Login failed");
    else{
        res.cookie("userdata",{user:name, pages:[]},{maxAge:30000,signed:true});
        res.send("Login Suceessfully");
    }

});
app.get("/logout", function(req,res){
    res.clearCookie("userdata");
    res.send("Cookies Cleared");
});
app.get("/cookieData", function (req,res){
    let userdata = req.signedCookies.userdata;
    res.send(userdata);
});
app.get("/users",function(req,res){
    let userdata= req.signedCookies.userdata;
    let {user,pages} =userdata;
    if (!userdata || user ==="Guest")
    res.status(401).send("No access Please login first");
    else{
        let u1 = users.find((u)=> u.name===user);
        if(u1.role==="admin"){
            let names =users.map((u)=>u.name);
            res.send(names);
        }else res.status(403).send("Forbidden");
    }
})
// app.get("/viewPage",function(req,res){
//     let name = req.signedCookies.name;
//     let counter = req.signedCookies.counter;
//     console.log(name);
//     if (!name){
//         res.cookie("name","Guest",{maxAge:160000,signed:true});
//         res.cookie("counter",1,{maxAge:150000,signed:true});
//         res.send("cookie Set");
//     }else{
//         res.cookie("counter", +counter +1, {signed:true});
//         res.send(`Cookie recived for name: ${name} counter:${counter}`);
//     }
// })

// app.post("/viewPage", function(req,res){
//     let {name} =req.body;
//     res.cookie("name",name,{maxAge:150000, signedCookies:true} );
//     res.cookie("Counter", 1,{maxAge:150000,signedCookies:true});
//     res.send(`Cookie set with name=${name}`);
// });
// app.delete("/viewPage",function(req,res){
//     res.clearCookie("name");
//     res.clearCookie("counter");
//     res.send("Cookie deleted");
// });
