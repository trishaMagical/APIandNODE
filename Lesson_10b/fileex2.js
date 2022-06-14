let fs = require("fs");
let readline =require ("readline-sync");
let fname = "data.json";
let courseData = {
    course: "Node.js",
    students:[
        {name : "Trisha", age: 25},
        {name : "Chitra", age: 35},
        {name : "Syani", age: 27},
    ],
};

function writeJson(){
    let str = JSON.stringify(courseData);
    fs.watchFile(fname,str,function(err){
        if (err) console.log(err);
    });
}

function updateJSON(){
    let name = readline.question("Enter name of the student:");
    let age = readline.question("Enter name of the age:");
     let newStudent = {name: name , age: age};
     fs.readFile(fname,"utf8", function(err, data){
        if (err) console.log(err);
        else {
            let obj = JSON.parse(data);
            obj.students.push(newStudent);
            let data1 = JSON.stringify(obj);
            fs.writeFile(fname, data1,function(err){
                if(err) console.log(err);
                else console.log("Data Updated");
            })
        }

     });
}
 function readJson(){
    fs.readFile(fname,"utf8",function(err,data){
        if (err) console.log(err);
        else{
            let obj = JSON.parse(data);
            console.log(obj);
        }
    });
 }
  let option = readline.question("Enter option 1: write 2:Update json-");
  switch(option) {
      case "1":
          writeJson();
          break;
      case "2":
          updateJSON();
          break;
      case "3" : readJson();
        break;
        

  }