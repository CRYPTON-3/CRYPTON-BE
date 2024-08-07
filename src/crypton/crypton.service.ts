import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptonService {
  private algorithm = 'aes-256-cbc';
  private fixedIV = Buffer.alloc(16, 0);

  convertToCryptonFile({
    file,
    uuid,
  }: {
    file: Express.Multer.File;
    uuid: string;
  }) {
    const { base64File, key, hash } = this.encrypt(file.buffer);

    const header =
      'originalFormat:' +
      file.mimetype +
      ';id:' +
      uuid +
      ';originalExt:' +
      file.originalname.split('.').pop() +
      ';\n';
    const body = base64File;

    return {
      cryptoFile: header + body,
      key,
      hash,
    };
  }

  encrypt(data: Buffer) {
    const key = crypto.randomBytes(32);

    const ciper = crypto.createCipheriv(this.algorithm, key, this.fixedIV);
    const base64Key = key.toString('base64');
    const base64File = Buffer.concat([
      ciper.update(data),
      ciper.final(),
    ]).toString('base64');
    const base64Hash = this.getHash(base64File);

    return {
      key: base64Key,
      hash: base64Hash,
      base64File,
    };
  }

  decrypt(base64File: string, base64Key: string) {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(base64Key, 'base64'),
      this.fixedIV,
    );
    const buffer = Buffer.from(base64File, 'base64');
    return Buffer.concat([decipher.update(buffer), decipher.final()]);
  }

  getHash(base64File: string) {
    return crypto.createHash('sha256').update(base64File).digest('base64');
  }
}
