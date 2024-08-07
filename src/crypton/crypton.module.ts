import { Module } from '@nestjs/common';
import { CryptonService } from './crypton.service';

@Module({
  providers: [CryptonService],
  exports: [CryptonService],
})
export class CryptonModule {}
