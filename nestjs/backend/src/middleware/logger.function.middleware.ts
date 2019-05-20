
// middleware simples que expoe apenas uma função
export function logger(req, res, next) {
  console.log(`logger funcion`);
  next();
};