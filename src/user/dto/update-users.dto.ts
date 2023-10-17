import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsUUID, MinLength } from "class-validator";
import { EmailIsUnique } from "../validators/email-unico.validator";

export class UpdateUserDTO{
    @IsEmpty()
    @IsOptional()
    id: string
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    @IsOptional()
    nome: string;
    @IsEmail(undefined, { message: 'O email não é valido' })
    @IsOptional()
    email: string;
    @IsOptional()
    @MinLength(6, {message: 'O tamanho da senha é inferior a 6 caracteres'})
    senha: string;
}
