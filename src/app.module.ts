import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/database/prisma.module';

@Module({
  imports: [
    PrismaModule
  ],
})
export class AppModule {}
