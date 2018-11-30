'use strict'
class Pessoa {
  constructor () {
    this.nome = ''
    this.sobrenome = ''
    this.idade = 0
  }
}

let pessoa = { nome: 'Paulo', sobrenome: 'Fernandes' }
let outraPessoa = {nome: '', sobrenome: '', idade: 0}
let nome, sobrenome

let pessoaClasse = new Pessoa();

({nome, sobrenome} = pessoa)
console.log(nome, sobrenome);

(outraPessoa = pessoa)
console.log(outraPessoa);

(pessoaClasse = pessoa)
console.log(pessoaClasse)
