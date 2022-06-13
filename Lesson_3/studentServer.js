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
let {studentsData} =require("./studentData");
app.listen(port,()=>console.log(`Node app Listening on port ${port}!`));
app.get("/svr/test",function(req,res){
    res.send("Test Response");
    
});
app.get("/svr/studentsData", function(req,res){
    res.send(studentsData);
});
app.get("/svr/studentsData/:id", function(req,res){
    let id = +req.params.id;
    let student =studentsData.find((st)=>st.id===id);
    if(student)res.send(student);
    else res.status(404).send("no student found");
});
app.get("/svr/studentsData/course/:name", function(req,res){
    let name = req.params.name;
    const arr1= studentsData.filter((st)=>st.course===name);
    res.send(arr1);

    
});
app.get("/svr/studentsData/grade", function(req,res){
    // console.log("GET /svr/students" ,req.query);
      let grade = req.query.grade;
      const arr1 = studentsData;
     if(course) arr1= arr1.filter((st)=>st.grade===grade);
     res.send(arr1);
      
  });

app.get("/svr/students", function(req,res){
   console.log("GET /svr/students" ,req.query);
    let course = req.query.course;
    const arr1 = studentsData;
   if(course) arr1= arr1.filter((st)=>st.course===course);
   res.send(arr1);
    
});
app.get("/svr/students", function(req,res){
    console.log("GET /svr/students" ,req.query);
     let courseStr = req.query.course;
     let arr1 = studentsData;
     if (courseStr){
        let courseArr =courseStr.split(",");
        arr1= arr1.filter((st)=>courseArr.find((c1)=>c1===st.course));

     }
     res.send(arr1);
     
 });
 app.post("svr/students",function(req,res){
        let body = req.body;
        console.log(body);
        studentsData.push(body);
    });
 