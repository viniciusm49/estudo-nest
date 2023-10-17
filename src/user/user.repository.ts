import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class UserRepository{
    private users: User[] = [];
    async save(user: User){
        this.users.push(user);  
    }
    private buscarPorId(id: string){
        const possivelUsuario = this.users.find(
            user => user.id === id 
        );
        if(!possivelUsuario){
            throw new NotFoundException(`Usuario com ${id} não existe`)};
        return possivelUsuario;
    }
    async getAll(){
        return this.users;
    }
    async validarEmailUnico(email: string){
        const possivelUsuario = this.users.find(
            user => user.email === email
        );
        return possivelUsuario !== undefined;
    }
    async verificarSeExisteId(id: string) {
        return this.users.some(user => user.id === id);
    }
    async update(id: string, body: Partial<User>) {
        const possivelUsuario = this.buscarPorId(id);
        Object.entries(body).forEach(([chave, valor]) => {
            if(chave === 'id'){
                return;
            }
            possivelUsuario[chave] = valor;
        });
    }
    async delete(id: string) {
        const possivelUsuario = this.buscarPorId(id);
        this.users.splice(this.users.indexOf(possivelUsuario),1);
    }
}
