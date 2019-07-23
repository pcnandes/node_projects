import { Unidade } from "../unidade/unidade.entity";

export class Bloco {
  // uuid
  public id?: string
  public nome?: string
  public unidades: Unidade []
}