import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProdutoModule } from './produto/produto.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UserModule, ProdutoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
