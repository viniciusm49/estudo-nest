import { Transform, Type } from "class-transformer";
import { ArrayMinSize, IsDate, IsNotEmpty, IsNumber, IsString, IsUUID, Length, Min, ValidateNested } from "class-validator";
import { UserExists } from "../validators/produto.validator";

export class CriarProdutoDTO {
    @IsUUID()
    @UserExists({message: "Não existe um usuario com esse id"})
    usuarioId:string;
    @IsNotEmpty()
    nome: string;

    @Min(1)
    @IsNumber({ maxDecimalPlaces: 2 })
    valor: number;

    @Min(0)
    quantidadeDisponivel: number;

    @Length(0, 1000)
    descricao: string;

    @IsNotEmpty()
    categoria: string;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    dataCriacao: string;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    dataAtualizacao: string;

    @ArrayMinSize(3)
    @ValidateNested()
    @Type(() => CaracteristicaProdutoDTO)
    caracteristicas: CaracteristicaProdutoDTO[];

    @ArrayMinSize(1)
    @ValidateNested()
    @Type(() => ImagemProdutoDTO)
    imagens: ImagemProdutoDTO[];
}

export class CaracteristicaProdutoDTO {
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    descricao: string;
}

export class ImagemProdutoDTO {
    @IsNotEmpty()
    @IsString()
    url: string;
    
    @IsNotEmpty()
    descricao: string;
}
