import { Usuario } from '../modules/usuario/usuario.entity';

// TODO usar memory-cache nas maquinas locais e Redis no estaleiro
const cache = require('memory-cache')

export function gravarUsuario (usuario: Usuario, expiration: number) {
  if(usuario && usuario.cpf){
    cache.put(+usuario.cpf, usuario, expiration)
  }
}

export async function getUsuario (cpf: number): Promise<Usuario> {
  return await cache.get(+cpf)
}

export async function deletarUsuario (cpf: number): Promise<boolean> {
  return cache.del(+cpf)
}

export function put (key: string, value: any, expiration: number) {
  cache.put(key, value, expiration)
}

export async function get (key: string): Promise<any> {
  return await cache.get(key)
}

export async function deletar (key: string): Promise<boolean> {
  return cache.del(key)
}

export async function clear (): Promise<void> {
  return cache.clear()
}
