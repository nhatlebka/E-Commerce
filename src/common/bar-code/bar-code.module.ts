import { Module } from '@nestjs/common';
import { BarCodeService } from './bar-code.service';

@Module({
  imports: [],
  providers: [BarCodeService],
  exports: [BarCodeService],
})
export class BarCodeModule {}
