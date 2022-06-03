import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecruitmentController } from 'src/controller/recruitment.controller';
import { JwtStrategy } from 'src/guards/jwt.strategy';
import { RolesGuard } from 'src/guards/roles.guard';
import { Account, AccountSchema } from 'src/model/account.model';
import { Recruitment, RecruitmentSchema } from 'src/model/recruitment.model';
import { RecruitmentService } from 'src/service/recruitment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recruitment.name, schema: RecruitmentSchema },
    ]),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  providers: [RecruitmentService, JwtStrategy, RolesGuard],
  controllers: [RecruitmentController],
  exports: [
    MongooseModule.forFeature([
      { name: Recruitment.name, schema: RecruitmentSchema },
    ]),
  ],
})
export class RecruitmentModule {}
