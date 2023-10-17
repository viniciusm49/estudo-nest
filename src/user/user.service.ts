import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    async getAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;

        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        let possivelUsuario = await this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
        if (!possivelUsuario) {
            throw new NotFoundException(`Usuario não existe`)
        };
        return possivelUsuario;
    }
    async create(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({
            data,
        });
    }
    async verificarEmailUnico(email?: string) {
        const possivelEmail = await this.prisma.user.findUnique({
            where: { email: email }
        });
        return possivelEmail === null;
    }
    async update(id: string, data: Prisma.UserUpdateInput) {
        if (data.id) {
            throw new NotFoundException(`Não é possível alterar o id`);
        }
        const usuarioExiste = await this.user({ id: id });
        if (!usuarioExiste) {
            throw new NotFoundException(`Usuario com ${id} não existe`);
        }
        try {
            const updateUser = await this.prisma.user.update({
                where: { id: id },
                data
            });
            return updateUser;
        } catch (error) {
            throw new ConflictException('Email já utilizado!');
        }
    }
}
