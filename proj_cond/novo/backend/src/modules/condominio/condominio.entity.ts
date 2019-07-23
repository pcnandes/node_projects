import { Bloco } from "../bloco/bloco.entity";

export class Condominio {
  // uuid
  public id?: string
  public nome?: string
  // ['RASCUNHO', 'ATIVO', 'INATIVO']
  public situacao: string[]
  public blocos: Bloco []
}