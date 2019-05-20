import { IsString, IsInt } from 'class-validator';

// para usar os validadores é preciso instalar
// $ npm i --save class-validator class-transformer
// https://github.com/typestack/class-validator#usage
export class CreateCatDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;
}