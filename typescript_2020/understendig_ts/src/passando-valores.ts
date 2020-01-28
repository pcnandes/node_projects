// Typr alias sao usados para combinações complexas
type Combinable = "as-number" | "as-text";

function combine(
  input1: string | number,
  input2: string | number,
  // tipos literais
  // resultConvertion: "as-number" | "as-text"
  resultConvertion: Combinable
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConvertion === "as-text"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 20, "as-number");
console.log(combinedAges);
