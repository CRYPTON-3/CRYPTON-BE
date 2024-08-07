import { Injectable } from '@nestjs/common';
import { CryptonService } from 'src/crypto/crypton.service';
import { FileRepository } from './file.repository';
import { AwsService } from 'src/aws/aws.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  constructor(
    private readonly cryptonService: CryptonService,
    private readonly fileRepository: FileRepository,
    private readonly awsService: AwsService,
  ) {}
  async upload(files: Express.Multer.File[], userId: number) {
    for (const file of files) {
      const fileId = uuidv4();
      const { cryptoFile, key, hash } =
        this.cryptonService.convertToCryptonFile({
          file,
          uuid: fileId,
        });

      key;
      hash;
      userId;

      await this.awsService.uploadCryptonFile(cryptoFile, fileId);
      await this.fileRepository.createFile({
        fileName: file.originalname + '.crypton',
        hash,
        key,
        userId,
        fileId,
      });
    }
    return;
  }
}
