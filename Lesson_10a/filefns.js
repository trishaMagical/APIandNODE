let fs =require("fs");

function getStat(filename){
    console.log("stat:", filename);
    fs.stat(filename,function(err,content){
        if(err) console.log(err);
        else console.log(content);
    });

}
function checkAccess(filename){
    console.log("access:", filename);
    fs.access(filename,function(err){
        err ? console.log("Does not exist") : console.log("Exists");
    })
};
function readFile(filename){
    console.log("readFile",filename);
    fs.readFile(filename,"utf8", function(err,data){
        if(err) console.log(err);
        else console.log(data);
    })
};
function writeFile(filename,data){
    console.log("WriteFile", filename);
    fs.writeFile(filename,data,function(err){
        if(err) console.log(err);
    });
};
function appendFile(filename,data){
    console.log("appendFile", filename);
    fs.writeFile(filename,data,function(err){
        if(err) console.log(err);
    });
}
let fname = "hello.txt";
//getStat(fname);
//checkAccess(fname);
 readFile(fname);
 appendFile(fname,"efdghj");
 readFile(fname);
writeFile(fname, "Hello1234");
readFile(fname);
