import { Module } from '@nestjs/common';
import { UploadController } from 'src/controller/upload.controller';
import { UploadService } from 'src/service/upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
