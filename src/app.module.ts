import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { GroupUsersModule } from './group-users/group-users.module';
import { UserModule } from './user/user.module';

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
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
