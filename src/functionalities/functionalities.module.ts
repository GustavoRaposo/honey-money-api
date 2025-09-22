import { Module } from '@nestjs/common';
import { FunctionalitiesService } from './functionalities.service';
import { FunctionalitiesController } from './functionalities.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FunctionalitiesController],
  providers: [FunctionalitiesService],
  exports: [FunctionalitiesService],
})
export class FunctionalitiesModule {}