import { Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { UploadService } from 'src/service/upload.service';

@Controller('fileupload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @HttpCode(200)
  @Post()
  async create(@Req() request, @Res() response) {
    try {
      await this.uploadService.fileupload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}
