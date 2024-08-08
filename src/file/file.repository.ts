import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createFile({
    fileName,
    fileId,
    hash,
    key,
    userId,
  }: {
    fileName: string;
    fileId: string;
    hash: string;
    key: string;
    userId: number;
  }) {
    return this.prismaService.file.create({
      data: {
        name: fileName,
        id: fileId,
        hash,
        key,
        ownerId: userId,
      },
    });
  }
}
