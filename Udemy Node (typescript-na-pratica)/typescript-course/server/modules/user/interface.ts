// requisitos obrigatorio para um usuario
export interface IUser {
  readonly id: number, 
  name: string,
  email: string,
  password: string
}

// caso existam informações adicionais entraram aqui
export interface IUserDetail extends IUser{

}

export function createUser({id, name, email, password}: any): IUser{
  return {
    id, name, email, password
  }
}

export function createUsers(data: any[]): IUser[] {
  // para cara elemento será criado um usuario
  return data.map(createUser)
}

export function createUserById({id, name, email, password}: any): IUserDetail {
  return {
    id, name, email, password
  }
}

export function createUserByEmail({id, name, email, password}: any):IUserDetail {
  return {
    id, name, email, password
  }
}