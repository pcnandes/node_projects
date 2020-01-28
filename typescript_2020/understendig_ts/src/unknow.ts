let userInput: unknown;
let userAny: any;
let userName: string;

userInput = 5;
userInput = "Max";

// unknown exige que teste o tipo antes de atibuir a variável, por isso é mais seguto que any;
if (typeof userInput === "string") {
  userName = userInput;
}

// any permite qqr coisa, o TS assume que o programador sabe oq está fazendo e ignora erros de compilação;
userName = userAny;

// never nao retorna nada.. void retorna undefined, never indica que a funcao nao terá retorno algum
// normalmente usado em coisa que gerão erro, ou coisas infinitas
function generateError(message: string, code: number): never {
  throw { message, erroCode: code };
  // while(true) {}
}
