const persons =[
    {name:"Trisha", age:25},
    {name:"Anwesha",age:26},
    {name:"Madhura",age:27},
];
//console.log(persons);
persons.push({name:"Nikita", age:23});
//console.log(persons);
let name1 ="Anwesha";
let person= persons.find((p1)=>p1.name===name1);
console.log(person);
