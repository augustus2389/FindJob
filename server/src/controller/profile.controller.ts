import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateProfileDTO } from 'src/dto/createProfileDto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ProfileService } from 'src/service/profile.service';

@Controller('user')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('createProfile')
  createProfile(@Req() req, @Body() profile: CreateProfileDTO) {
    return this.profileService.createProfile(
      req.user.role,
      req.user._id,
      profile,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  getProfile(@Req() req) {
    return this.profileService.getProfile(req.user.role, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateProfile')
  updateProfile(@Req() req, @Body() profile: CreateProfileDTO) {
    return this.profileService.updateProfile(
      req.user.role,
      req.user._id,
      profile,
    );
  }
}
