export class ListUserDTO{
    constructor(
        readonly id: string,
        readonly nome: string,
        readonly email: string,
        readonly ativo: boolean
    ){}
}