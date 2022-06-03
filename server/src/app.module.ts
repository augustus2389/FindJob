import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth.module';
import { CVModule } from './module/cv.module';
import { ProfileModule } from './module/profile.module';
import { RecruitmentModule } from './module/recruitment.module';
import { UploadModule } from './module/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
    }),
    MongooseModule.forRoot('mongodb://localhost/Find'),
    AuthModule,
    ProfileModule,
    RecruitmentModule,
    CVModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
