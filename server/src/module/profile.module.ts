import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from 'src/controller/profile.controller';
import { JwtStrategy } from 'src/guards/jwt.strategy';
import { RolesGuard } from 'src/guards/roles.guard';
import { Profile, ProfileSchema } from 'src/model/profile.model';
import { ProfileService } from 'src/service/profile.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  providers: [ProfileService, JwtStrategy, RolesGuard],
  controllers: [ProfileController],
  exports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
})
export class ProfileModule {}
