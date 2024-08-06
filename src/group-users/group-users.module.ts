import { Module } from '@nestjs/common';
import { GroupUsersService } from './group-users.service';
import { GroupUsersController } from './group-users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GroupUserRepository } from './group-users.repository';

@Module({
  imports: [PrismaModule],
  controllers: [GroupUsersController],
  providers: [GroupUsersService, GroupUserRepository],
  exports: [GroupUsersService],
})
export class GroupUsersModule {}
