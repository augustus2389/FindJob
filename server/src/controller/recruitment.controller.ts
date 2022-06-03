import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateRecruitmentDTO } from 'src/dto/createRecruitmentDto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RecruitmentService } from 'src/service/recruitment.service';

@Controller('recruitment')
export class RecruitmentController {
  constructor(private recruitmentService: RecruitmentService) {}

  @Get('getAll')
  getAll() {
    return this.recruitmentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAllNotAccept')
  getAllNotAccept(@Req() req) {
    return this.recruitmentService.findAllNotAccept(req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAllCreator')
  getAllCreator(@Req() req) {
    return this.recruitmentService.findAllCreator(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createProfile(@Req() req, @Body() recruitment: CreateRecruitmentDTO) {
    return this.recruitmentService.createRecruitment(
      req.user.status,
      req.user._id,
      recruitment,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  updateRecruitment(
    @Req() req,
    @Query('id') id: string,
    @Body() recruitment: CreateRecruitmentDTO,
  ) {
    return this.recruitmentService.updateRecruitment(
      req.user.status,
      req.user._id,
      req.user.role,
      id,
      recruitment,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('updateRecruitmentAdmin')
  updateRecruitmentAdmin(@Req() req, @Query('id') id: string) {
    return this.recruitmentService.updateRecruitmentAdmin(req.user.role, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteRecruitment(@Query('id') id: string) {
    return this.recruitmentService.deleteRecruitment(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get')
  getRecruitment(@Query('id') id: string) {
    return this.recruitmentService.getRecruitment(id);
  }
}
