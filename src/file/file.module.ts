import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileRepository } from './file.repository';
import { MulterModule } from '@nestjs/platform-express';
import { CryptonModule } from 'src/crypton/crypton.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [
    PrismaModule,
    CryptonModule,
    AwsModule,
    MulterModule.register({
      fileFilter: (req, file, cb) => {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString(
          'utf8',
        );
        cb(null, true);
      },
    }),
  ],
  controllers: [FileController],
  providers: [FileService, FileRepository],
})
export class FileModule {}
