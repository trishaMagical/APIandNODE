//use the file define in module
let mainFile= require("./mod1");
console.log(mainFile);
// let {name,job,techs, hello}= require("./mod1");
 console.log(mainFile.fns.knowsTech("JS"));
 console.log(mainFile.fns.knowsTech("Java"));