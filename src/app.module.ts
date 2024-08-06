import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { GroupUsersModule } from './group-users/group-users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
    }),
    AuthModule,
    GroupModule,
    GroupUsersModule,
  ],
  providers: [],
})
export class AppModule {}
