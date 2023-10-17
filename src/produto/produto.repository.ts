import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";

@Injectable()
export class ProdutoRepository{
    private produtos: ProdutoEntity[] = [];
    async create(produto: ProdutoEntity){
        this.produtos.push(produto);
    }
    async getAll(){
        return this.produtos;
    }
    async findById(id: number){
        return this.produtos[id];
    }
}