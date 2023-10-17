import { IsEmail, IsNotEmpty, IsOptional, IsUUID, MinLength } from "class-validator";
import { EmailIsUnique } from "../validators/email-unico.validator";

export class UpdateUserDTO{
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    @IsOptional()
    nome: string;
    @IsEmail(undefined, { message: 'O email não é valido' })
    @EmailIsUnique({message:'Já existe um usuario com esse email'})
    @IsOptional()
    email: string;
    @IsOptional()
    @MinLength(6, {message: 'O tamanho da senha é inferior a 6 caracteres'})
    senha: string;
}
