let i = 0;
const originalLog = console.log;




function safeStringify(value) {
  if (typeof value === "symbol") return value.toString();
  if (Array.isArray(value)) return `[${value.map(safeStringify).join(", ")}]`;
  if (value && typeof value === "object") {
    return JSON.stringify(value, (key, val) =>
      typeof val === "symbol" ? val.toString() : val,
      2
    );
  }
  return String(value);
}


function add_fragment_code(description, code) {
  const desc = document.createElement("h1");
  desc.textContent = description;

  const pre = document.createElement("pre");
  const code_component = document.createElement("code");
  code_component.id = `code-block_${i}`;
  code_component.className = "language-javascript";
  code_component.textContent = code;
  pre.appendChild(code_component);

  Prism.highlightElement(code_component);

  const output = document.createElement("div");
  output.id = `output_${i}`;
  output.className = "output";
  output.style.whiteSpace = "pre-wrap";
  output.style.background = "#eef";
  output.style.padding = "1em";
  output.style.marginTop = "1em";
  output.style.borderRadius = "8px";


  const localLog = console.log;
  console.log = function (...args) {
    output.textContent += args.map(safeStringify).join(" ") + "\n";
    originalLog.apply(console, args);
    originalLog.apply(console, args);
  };
  try {
    eval(code);
  } catch (e) {
    output.textContent += "⚠️ Error: " + e.message;
  }
  console.log = localLog;

  const app = document.getElementById("app");
  if (app) {
    app.appendChild(desc);
    app.appendChild(pre);
    app.appendChild(output);
  }

  i++;
}

add_fragment_code("Print single symbol", `
const symbol1 = Symbol()
console.log(symbol1)
`);

add_fragment_code("Print single symbol with description", `
const symbol2 = Symbol("description")
console.log(symbol2)
`);

add_fragment_code("Symbols don't appear in \`for... in\` loops", `
const symbol1 = Symbol()
const developer = { 
  name: "Alberto Caro",
  [symbol1]: "cocacola-cero"
};

for (let key in developer){
  console.log(key);
}
`);

add_fragment_code("Symbols don't appear in JSON.stringify", `
const symbol1 = Symbol()
const developer = { 
  name: "Alberto Caro",
  [symbol1]: "cocacola-cero"
};

console.log(JSON.stringify(developer))
`);

add_fragment_code("Symbols don't appear in Object.getOwnPropertyNames", `
const symbol1 = Symbol()
const developer = { 
  name: "Alberto Caro",
  [symbol1]: "cocacola-cero"
};

console.log(Object.getOwnPropertyNames(developer))
`);

add_fragment_code("But they do appear with Object.getOwnPropertySymbols", `
const symbol2 = Symbol("description")
const developer = { 
  name: "Alberto Caro",
  [symbol2]: "cocacola-cero"
};

console.log(Object.getOwnPropertySymbols(developer))
`);


add_fragment_code("Custom Symbol.iterator implementation", `
const rango = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const end = this.to;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for (const num of rango) {
  console.log(num);
}
`);

add_fragment_code("Symbol.asyncIterator", `
const asyncRange = {
  from: 1, to: 3,
  async *[Symbol.asyncIterator]() {
    for (let i = this.from; i <= this.to; i++) {
      await new Promise(r => setTimeout(r, 10));
      yield i;
    }
  }
};

(async () => {
  for await (const num of asyncRange) {
    console.log(num);
  }
})();
`);

add_fragment_code("Symbol.toPrimitive", `
const obj = {
  name: "Alberto",
  [Symbol.toPrimitive](hint) {
    if (hint === "string") return "Nombre";
    if (hint === "number") return 42;
    return "default";
  }
};

console.log(String(obj)); // "Nombre"
console.log(+obj);        // 42
console.log(obj + "");    // "default"
`);

add_fragment_code("Symbol.toStringTag", `
const obj = {
  [Symbol.toStringTag]: "CustomTag"
};

console.log(Object.prototype.toString.call(obj)); // [object CustomTag]
`);

add_fragment_code("Symbol.hasInstance", `
class EvenChecker {
  static [Symbol.hasInstance](instance) {
    return typeof instance === "number" && instance % 2 === 0;
  }
}

console.log(2 instanceof EvenChecker); // true
console.log(3 instanceof EvenChecker); // false
`);

add_fragment_code("Symbol.isConcatSpreadable", `
const obj = {
  0: "x", 1: "y", length: 2,
  [Symbol.isConcatSpreadable]: true
};

console.log(["a", "b"].concat(obj)); // ["a", "b", "x", "y"]
`);

add_fragment_code("Symbol.species", `
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}

const a = new MyArray(1, 2, 3);
const b = a.map(x => x * 2);

console.log(b instanceof MyArray); // false
console.log(b instanceof Array);   // true
`);

add_fragment_code("Symbol.match", `
const matcher = {
  [Symbol.match](str) {
    return str.includes("abc") ? ["abc"] : null;
  }
};

console.log("xyzabc".match(matcher)); // ["abc"]
`);

add_fragment_code("Symbol.unscopables", `
const obj = {
  a: 1,
  b: 2,
  [Symbol.unscopables]: {
    b: true
  }
};

with (obj) {
  console.log(a); // 1
  // console.log(b); // ReferenceError
}
`);
