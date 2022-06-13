const { futimes } = require("fs");

//define module
let name = "Trisha";
let job = "Software Engineer";
let techs = ["JS","React","Node"];
function knowsTech(tech){
    console.log("In function knowsTech",tech);
    return techs.find((t1)=>t1===tech)? true:false;
}
module.exports.data = {name , job, techs}
module.exports.fns = {knowsTech};
// module.exports.job = job;
// module.exports.techs = techs;
// module.exports.hello="Hello World Trisha";