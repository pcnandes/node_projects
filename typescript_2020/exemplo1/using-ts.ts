const button = document.querySelector("button")!;
// ! -> indica que o campo nao pederá ser null, indica ao TS qeu pode confiar que esse objeto existe
// as -> converte o tipo
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: number, num2: number) {
  return num1 + num2;
}

button.addEventListener("click", function() {
  console.log(add(+input1.value, +input2.value));
});
