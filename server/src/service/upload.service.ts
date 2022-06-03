import { Req, Res, Injectable } from '@nestjs/common';
import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Injectable()
export class UploadService {
  constructor() {}

  async fileupload(@Req() req, @Res() res) {
    try {
      this.upload(req, res, function (error) {
        if (error) {
          return res.status(404).json(`Failed to upload file : ${error}`);
        }
        return res.status(200).json(process.env.S3_URL + req.files[0].key);
      });
    } catch (error) {
      return res.status(500).json(`Failed to upload file : ${error}`);
    }
  }

  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: AWS_S3_BUCKET_NAME,
      key: function (request, file, cb) {
        cb(null, `${Date.now().toString()}-${file.originalname}`);
      },
    }),
  }).array('upload', 1);
}
