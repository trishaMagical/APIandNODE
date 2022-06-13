let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
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
//app.use("/myOrders",aunthenticateToken)
const port = 2410;
app.listen(port, () => console.log(`Node app Listening on port ${port}!`));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(aunthenticateToken);
const jwt = require("jsonwebtoken");
const jwt_key = "secretjkey237483";
const jwtExpiryTime = 300;

let { users, orders } = require("./data-2.js");
let cookieName ="jwtToken";
function aunthenticateToken(req,res,next){
    //console.log("In middleware: AuthenticateToken");
    //console.log((req.headers));
    const token = req.cookie[cookieName];
    console.log("Token:" , token);
    if(!token) res.status(401).send("Please login first");
    else{
        jwt.verify(token,jwt_key,function(err, data){
            if(err) res.status(403).send(err);
            else{
                 console.log(data);
                req.user = data.user;
               next();
            }
        })
    }
}

app.post("/login", function (req, res) {
    let { username, password } = req.body;
    let user = users.find((u) => u.name === username && u.password === password);
    if (user, orders) {
        const token = jwt.sign({ user }, jwt_key, {
            algorithm: "HS256",
            expiresIn: jwtExpiryTime,

        });
        res.cookie(cookieName,token);
        res.send("Logon sucessfully");
    } else res.status(401).send("Login failed");
});
app.get("/myOrders", function (req, res) {
    console.log("In Get request /myOrders");
    let orders1 = orders.filter((ord) => ord.userId === req.user.id);
    res.send(orders1);
    // console.log((req.headers));
    // const token = req.headers["authorization"];
    // console.log("Token:", token);
    // if (!token) res.status(401).send("Please login first");
    // else {
    //     jwt.verify(token, jwt_key, function (err, data) {
    //         if (err) res.status(403).send(err);
    //         else {
    //             console.log(data);
    //             let orders1 = orders.filter((ord) => ord.userId === data.user.id);
    //             res.send(orders1);
    //         }
    //     })
    // }
});
app.get("/info",function(req,res){
    res.send("Hello.Welcome to the Trisha's world");
})