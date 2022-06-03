import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/guards/jwt.strategy';
import { RolesGuard } from 'src/guards/roles.guard';
import { CV, CVSchema } from 'src/model/cv.model';
import { CVService } from 'src/service/cv.service';
import { Recruitment, RecruitmentSchema } from 'src/model/recruitment.model';
import { Profile, ProfileSchema } from 'src/model/profile.model';
import { CVController } from 'src/controller/cv.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CV.name, schema: CVSchema }]),
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    MongooseModule.forFeature([
      { name: Recruitment.name, schema: RecruitmentSchema },
    ]),
  ],
  providers: [CVService, JwtStrategy, RolesGuard],
  controllers: [CVController],
  exports: [MongooseModule.forFeature([{ name: CV.name, schema: CVSchema }])],
})
export class CVModule {}
