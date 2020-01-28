function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log("Result: ", +num);
}

printResult(add(5, 12));

// indica q essa variavel pode receber qqr funcao
// let combineValues: Function

// indica q a variável pode receber uma funcao que tera dois parametros numericos e retorna um numero.
let combineValues: (a: number, b: number) => number;

combineValues = add;

console.log(combineValues(4, 4));

/// exemplo usando callback function
function addAndHandler(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandler(10, 20, result => {
  console.log(result);
});
