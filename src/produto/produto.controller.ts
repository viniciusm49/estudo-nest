import { Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CriarProdutoDTO } from "./dto/produto.dto";
import { ProdutoEntity } from "./produto.entity";
import {v4 as uuid} from 'uuid';


@Controller("produto")
export class ProdutoController{
    constructor(private produtoRepository: ProdutoRepository){}
    @Get()
    async getAll(){
        return this.produtoRepository.getAll();
    }
    
    @Get(':id')
    async getProduto(@Param('id') id: string) {
        const produtoId = Number(id);
        const produto = await this.produtoRepository.findById(produtoId);
        if (!produto) {
            throw new NotFoundException('Produto não encontrado');
        }
        return produto;
    }

    @Post()
    async create(@Body() body: CriarProdutoDTO){
        const produto = new ProdutoEntity();
        produto.id = uuid();
        produto.nome = body.nome;
        produto.valor = body.valor;
        produto.descricao = body.descricao;
        produto.caracteristicas = body.caracteristicas;
        produto.categoria = body.categoria;
        produto.quantidadeDisponivel = body.quantidadeDisponivel;
        produto.dataAtualizacao = body.dataAtualizacao;
        produto.dataCriacao = body.dataCriacao;
        produto.imagens = body.imagens;

        this.produtoRepository.create(produto);
        console.log(typeof(produto.imagens));
        console.log(typeof(produto.caracteristicas));
        return "Produto cadastrado com sucesso!!";
    }
    

}