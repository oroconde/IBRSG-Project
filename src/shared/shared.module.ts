import { Module } from '@nestjs/common';
import { ErrorHandler } from './utils/handler-errors';

@Module({
  providers: [ErrorHandler],
  exports: [ErrorHandler],
})
export class SharedModule {}
