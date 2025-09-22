import { Module } from '@nestjs/common';
import { ProfileFunctionalitiesService } from './profile-functionalities.service';
import { ProfileFunctionalitiesController } from './profile-functionalities.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileFunctionalitiesController],
  providers: [ProfileFunctionalitiesService],
  exports: [ProfileFunctionalitiesService],
})
export class ProfileFunctionalitiesModule {}