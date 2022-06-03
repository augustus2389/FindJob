import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Account, AccountDocument } from 'src/model/account.model';
import * as bcrypt from 'bcrypt';
import { CreateAccountDTO } from 'src/dto/createAccountDto';
import { Role } from 'src/constant/enum';
import { Recruitment, RecruitmentDocument } from 'src/model/recruitment.model';
import { CV, CVDocument } from 'src/model/cv.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(CV.name) private cvModel: Model<CVDocument>,
    @InjectModel(Recruitment.name)
    private recuitmentModel: Model<RecruitmentDocument>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async getAllAccount(role: Role) {
    if (role === Role.ADMIN) {
      const findAll = await this.accountModel.find({
        $nor: [{ role: Role.ADMIN }],
      });
      throw new HttpException(
        {
          result: findAll,
          total: findAll.length,
          status: HttpStatus.OK,
          message: 'Tải thông tin các tài khoản thành công',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.FORBIDDEN,
          message: 'Tài khoản không có chức năng này',
        },
        HttpStatus.OK,
      );
    }
  }

  async updateStatusAccount(role: Role, id: string) {
    if (role === Role.ADMIN) {
      const findAccount = await this.accountModel.findOne({ _id: id });
      if (findAccount) {
        await this.accountModel.updateOne(
          { _id: id },
          { status: !findAccount.status },
        );
        const updateAccount = await this.accountModel.findOne({ _id: id });
        throw new HttpException(
          {
            result: updateAccount,
            status: HttpStatus.OK,
            message: updateAccount.status
              ? 'Mở khóa tài khoản thành công'
              : 'Khóa tài khoản thành công',
          },
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          {
            result: null,
            status: HttpStatus.NOT_FOUND,
            message: 'Không tìm thấy tài khoản cần cập nhật!!!',
          },
          HttpStatus.OK,
        );
      }
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.FORBIDDEN,
          message: 'Tài khoản không có chức năng này!!!',
        },
        HttpStatus.OK,
      );
    }
  }

  async getAccount(id: string) {
    const findAccount = await this.accountModel.findOne({
      _id: id,
    });
    if (findAccount) {
      throw new HttpException(
        {
          result: findAccount,
          status: HttpStatus.OK,
          message: 'Tải thông tin tài khoản thành công',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.BAD_REQUEST,
          message: 'Tài khoản không tồn tại',
        },
        HttpStatus.OK,
      );
    }
  }

  async getAccountByAdmin(role: string, id: string) {
    if (role === Role.ADMIN) {
      const findAccount = await this.accountModel.findOne({
        _id: id,
      });
      if (findAccount) {
        throw new HttpException(
          {
            result: findAccount,
            status: HttpStatus.OK,
            message: 'Tải thông tin tài khoản thành công',
          },
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          {
            result: null,
            status: HttpStatus.BAD_REQUEST,
            message: 'Tài khoản không tồn tại',
          },
          HttpStatus.OK,
        );
      }
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.FORBIDDEN,
          message: 'Tài khoản không có chức năng này',
        },
        HttpStatus.OK,
      );
    }
  }

  async registerAccount(user: CreateAccountDTO) {
    const findUser = await this.accountModel.findOne({
      email: user.email,
    });
    if (findUser)
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.BAD_REQUEST,
          message: 'Tên tài khoản đã tồn tại',
        },
        HttpStatus.OK,
      );
    const hashedPassword = await this.hashPassword(user.passWord);
    if (user.role === Role.CANDIDATE) {
      const newCandidate = await new this.accountModel({
        ...user,
        passWord: hashedPassword,
        role: Role.CANDIDATE,
      }).save();
      const candidateObject = newCandidate.toObject();
      delete candidateObject.passWord;
      throw new HttpException(
        {
          result: candidateObject,
          status: HttpStatus.OK,
          message: 'Tạo tài khoản thành công',
        },
        HttpStatus.OK,
      );
    } else if (user.role === Role.RECRUITER) {
      const newRecruiter = await new this.accountModel({
        ...user,
        passWord: hashedPassword,
        role: Role.RECRUITER,
      }).save();
      const recruiterObject = newRecruiter.toObject();
      delete recruiterObject.passWord;
      throw new HttpException(
        {
          result: recruiterObject,
          status: HttpStatus.OK,
          message: 'Tạo tài khoản thành công',
        },
        HttpStatus.OK,
      );
    }
  }

  async validateAccount(email: string, passWord: string): Promise<Account> {
    const findUser = await this.accountModel
      .findOne({ email })
      .select('userName role email passWord status');
    if (!findUser)
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.NOT_FOUND,
          message: 'Tài khoản không đúng !!!',
        },
        HttpStatus.OK,
      );
    const isValidPassword = await bcrypt.compare(passWord, findUser.passWord);
    if (!isValidPassword)
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.BAD_REQUEST,
          message: 'Mật khẩu không đúng !!!',
        },
        HttpStatus.OK,
      );
    const UserObject = findUser.toObject();
    delete UserObject.passWord;
    return UserObject;
  }

  async login(user: CreateAccountDTO) {
    const userValidate = await this.validateAccount(user.email, user.passWord);
    if (userValidate) {
      const token = await this.jwtService.signAsync(userValidate);
      throw new HttpException(
        {
          result: token,
          status: HttpStatus.OK,
          message: 'Đăng nhập thành công',
        },
        HttpStatus.OK,
      );
    }
  }

  async updatePassWord(userId: string, oldPass: string, newPass: string) {
    const findAccount = await this.accountModel.findOne({ _id: userId });
    if (findAccount) {
      const isValidPassword = await bcrypt.compare(
        oldPass,
        findAccount.passWord,
      );
      if (!isValidPassword)
        throw new HttpException(
          {
            result: null,
            status: HttpStatus.BAD_REQUEST,
            message: 'Mật khẩu cũ không đúng !!!',
          },
          HttpStatus.OK,
        );
      if (oldPass === newPass)
        throw new HttpException(
          {
            result: null,
            status: HttpStatus.BAD_REQUEST,
            message: 'Mật khẩu mới trùng lặp mặt khẩu cũ !!!',
          },
          HttpStatus.OK,
        );
      const hashedPassword = await this.hashPassword(newPass);
      await this.accountModel.updateOne(
        { _id: userId },
        { passWord: hashedPassword },
      );
      throw new HttpException(
        {
          result: await this.accountModel.findOne({ _id: userId }),
          status: HttpStatus.OK,
          message: 'Cập nhật mật khẩu thành công',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.NOT_FOUND,
          message: 'Không tìm thấy tài khoản',
        },
        HttpStatus.OK,
      );
    }
  }

  async deleteAccount(role: string, id: string) {
    if (role === Role.ADMIN) {
      await this.recuitmentModel.remove({ writer: id });
      await this.cvModel.remove({ receiver: id });
      const accountObject = await this.accountModel.findByIdAndRemove(id);
      throw new HttpException(
        {
          result: accountObject,
          status: HttpStatus.OK,
          message: 'Xóa tài khoản thành công',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.FORBIDDEN,
          message: 'Tài khoản không có chức năng này',
        },
        HttpStatus.OK,
      );
    }
  }

  async updateAccount(role: Role, id: string, newAccount: CreateAccountDTO) {
    if (role === Role.ADMIN) {
      const findAccount = await this.accountModel.findOne({ _id: id });
      const hashedPassword = await this.hashPassword(newAccount.passWord);

      if (findAccount) {
        await this.accountModel.updateOne(
          { account: id },
          { ...newAccount, updateAt: new Date(), passWord: hashedPassword },
          {
            new: true,
          },
        );
        throw new HttpException(
          {
            result: await this.accountModel.findOne({
              _id: findAccount._id,
            }),
            status: HttpStatus.OK,
            message: 'Cập nhật tài khoản thành công',
          },
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          {
            result: null,
            status: HttpStatus.NOT_FOUND,
            message: 'Không tìm thấy tài khoản!!!',
          },
          HttpStatus.OK,
        );
      }
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.FORBIDDEN,
          message: 'Tài khoản không có chức năng này',
        },
        HttpStatus.OK,
      );
    }
  }
}
