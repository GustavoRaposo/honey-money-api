import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { FunctionalitiesModule } from './functionalities/functionalities.module';
import { ProfileFunctionalitiesModule } from './profile-functionalities/profile-functionalities.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ProfilesModule,
    FunctionalitiesModule,
    ProfileFunctionalitiesModule,
    UserProfilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}