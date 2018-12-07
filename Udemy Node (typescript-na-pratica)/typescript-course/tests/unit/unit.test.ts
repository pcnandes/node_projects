import { testDouble, expect } from './config/helpers'
import User from '../../server/modules/user/service';


// descricao da suite de teste.. boa prática
describe('Testes Unitários do Controller', ()=> {
  describe('Método Create', () => {
    it('Deve criar um novo Usuário', () => {
      const novoUsuario = {
        id: 1,
        name: 'Novo Usuario',
        email: 'novousuario@email.com',
        password: '1234'
      }
      const user = new User();
      return user.create(novoUsuario)
      .then(data => {
        // verifica se tds as chaves estão retornando
        expect(data.dataValues).to.have.all.keys(
          ['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']
        )
      })
    });
  });

  describe('Método GET Users', () => {
    it('Deve retornar uma lista com todos os Usuários', () => {
      const user = new User();
      return user.getAll().then(data => {
        expect(data).to.be.an('array');
        expect(data[0]).to.have.all.keys(
          ['name', 'id', 'name', 'password']
        )
      })
    });
  });

  describe('Método getById', () => {
    it('Deve retornar um Usuario de acordo com o id passado', () => {
      const user = new User();
      return user.getById(1).then(data => {
        console.log('dataaa')
        expect(data).to.have.all.keys(
          ['name', 'id', 'name', 'password']
        )
      })
    });
  });

  describe('Método getByEmail', () => {
    it('Deve retornar um Usuario de acordo com o id passado', () => {
      const user = new User();
      return user.getByEmail('novousuario@email.com').then(data => {
        expect(data).to.have.all.keys(
          ['name', 'id', 'name', 'password']
        )
      })
    });
  });

  describe('Método Update', () => {
    it('Deve atualizar um Usuário', () => {
      const usuarioAtualizado = {
        nome: 'Nome Atualizado',
        email: 'atualizado@rmail.com'
      };
      const user = new User();
      return user.update(1, usuarioAtualizado).then(data => {
        expect(data[0]).to.be.equal(1);
      })
    });
  });

  describe('Método Delete', () => {
    it('Deve deletar um Usuário', () => {
      const user = new User();
      return user.delete(1).then(data => {
        expect(data).to.be.equal(1);
      })
    });
  });
})