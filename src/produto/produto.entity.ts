export class ProdutoEntity{
    id:string;
    nome:string;
    valor:number;
    quantidadeDisponivel:number;
    descricao: string;
    categoria: string;
    dataCriacao: string;
    dataAtualizacao: string;
    caracteristicas: CaracteristicaProdutoEntity[];
    imagens: ImagemProdutoEntity[];

}
export class CaracteristicaProdutoEntity{
    nome:string;
    descricao:string;
}
export class ImagemProdutoEntity{
    url:string;
    descricao:string;
}