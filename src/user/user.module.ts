import { Module } from "@nestjs/common";
import { UsuarioController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { EmailEhUnicoValidator } from "./validators/email-unico.validator";
import { UserExistsValidator } from "src/produto/validators/produto.validator";
import { UserService } from "./user.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [UsuarioController],
    providers: [UserRepository, EmailEhUnicoValidator, UserExistsValidator,UserService,PrismaService]
})
export class UserModule{}