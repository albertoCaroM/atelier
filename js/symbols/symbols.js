
console.log("Hello world");
const symbol1 = Symbol()
console.log(symbol1)
const symbol2 = Symbol("description")
console.log(symbol2)

console.log(".-.-.-.-.-.-.-.-.-.-")

const developer= { 
  name:"Alberto Caro",
  [symbol1]:"cocacola-cero"
};
  

// symbols don't appear in `for... in` loops
for (let key in developer){
  console.log(key);
}

// Nor do they appear in JSON.stringify.

console.log(JSON.stringify(developer))


// Nor do they appear with Object.getOwnPropertyNames(developer)
console.log(Object.getOwnPropertyNames(developer))



console.log(Object.getOwnPropertySymbols(developer))

let app=document.getElementById("app");
app.innerHTML="<h1> HELLO WORLD!!!</h1>";
