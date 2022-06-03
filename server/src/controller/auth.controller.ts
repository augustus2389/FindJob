import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateAccountDTO } from 'src/dto/createAccountDto';
import { UpdatePassDTO } from 'src/dto/updatePassDto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AuthService } from 'src/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: CreateAccountDTO) {
    return this.authService.registerAccount(user);
  }

  @Post('login')
  login(@Body() user: CreateAccountDTO) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('updatePass')
  updatePass(@Req() req, @Body() user: UpdatePassDTO) {
    return this.authService.updatePassWord(
      req.user._id,
      user.oldPass,
      user.newPass,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('updateAccount')
  updateAccount(
    @Req() req,
    @Body() user: CreateAccountDTO,
    @Query('id') id: string,
  ) {
    return this.authService.updateAccount(req.user.role, id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAccount')
  getAccount(@Req() req) {
    return this.authService.getAccount(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAccountByAdmin')
  getAccountByAdmin(@Req() req, @Query('id') id: string) {
    return this.authService.getAccountByAdmin(req.user.role, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAllAccount')
  getAllAccount(@Req() req) {
    return this.authService.getAllAccount(req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Get('updateStatusAccount')
  updateStatusAccount(@Req() req, @Query('id') id: string) {
    return this.authService.updateStatusAccount(req.user.role, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteAccount')
  deleteAccount(@Req() req, @Query('id') id: string) {
    return this.authService.deleteAccount(req.user.role, id);
  }
}
