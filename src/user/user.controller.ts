import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/user.dto";
import {v4 as uuid} from 'uuid';
import { ListUserDTO } from "./dto/list-user.dto";
import { UpdateUserDTO } from "./dto/update-users.dto";
import { UserService } from "./user.service";
import { User } from "@prisma/client";

@Controller('usuarios')
export class UsuarioController {
    constructor(private userRepository: UserRepository,private userService: UserService){}
    @Get('/teste')
    async get(){
      return 'apenas uma rota de teste'
    }
    //Puxar todos os usuarios
    @Get()
    async getAllUsers(){
        const listaUsers = this.userService.getAll({});
        const listarUserDTO = (await listaUsers).map(
            user => new ListUserDTO(user.id, user.nome)
        );
        return listarUserDTO;
    }
    //Criar novo usúario
    @Post()
    async create(@Body() body: CreateUserDTO){
        console.log(body);
        let user: User = {id: uuid(), nome:body.nome, email:body.email, senha:body.senha};
        console.log(user);
        this.userService.create(user);
        const respostaDTO = new ListUserDTO(user.id, user.nome);
        return respostaDTO;
    }
    //Atualizar dados do usuário
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateUserDTO){
        const userUpdater = await this.userService.update(id, body);
        return userUpdater;
    }
    //Deletar usuário
    @Delete(':id')
    async delete(@Param('id') id:string){
        await this.userRepository.delete(id);
        return `Usuário com id ${id} excluído com sucesso!`;
    }
}