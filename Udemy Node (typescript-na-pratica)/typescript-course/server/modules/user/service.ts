import { IUser, IUserDetail, createUser, createUsers, createUserById, createUserByEmail } from './interface';
// biblioteca para trabalhar com promises
import * as Bluebird from 'bluebird';
const model = require('../../models');

class User implements IUser {
  public id: number;
  public name: string;
  public email: string;
  public password: string;

  constructor(){}
  // recebe dados do usuario e salva no banco
  create(user: any) {
    return model.User.create(user)
  }

  getAll(): Bluebird<IUser[]>{
    return model.User.findAll({
      order: ['name']
    })
    // createUsers vai popular o objeto
    .then(createUsers)
  }
  getById(id: number): Bluebird<IUserDetail>{
    return model.User.findOne({
      where: {id}
    })
    .then(createUserById)
  }
  getByEmail(email: string): Bluebird<IUserDetail>{
    return model.User.findOne({
      where: {email}
    })
    .then(createUserByEmail)
  }
  update(id: number, user: any){
    // indica quais campos sao atualizaveis
    return model.User.update(user, {
      where: {id},
      fields: ['name', 'email', 'password']
    })
  }
  delete(id: number){
    return model.User.destroy({
      where: {id}
    })
  }
}

export default User;
