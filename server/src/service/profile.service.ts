import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/constant/enum';
import { CreateProfileDTO } from 'src/dto/createProfileDto';
import { Profile, ProfileDocument } from 'src/model/profile.model';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async createProfile(role: Role, id: string, newProfile: CreateProfileDTO) {
    if (role === 'candidate') {
      const findProfile = await this.profileModel.findOne({ account: id });
      if (findProfile) {
        throw new HttpException(
          {
            result: null,
            status: HttpStatus.BAD_REQUEST,
            message: 'Tài khoản này đã tạo hồ sơ rồi',
          },
          HttpStatus.OK,
        );
      } else {
        const profile = await new this.profileModel({
          ...newProfile,
          account: id,
        }).save();
        const profileObject = profile.toObject();
        throw new HttpException(
          {
            result: profileObject,
            status: HttpStatus.OK,
            message: 'Tạo hồ sơ thành công',
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

  async getProfile(role: Role, id: string) {
    if (role === 'candidate') {
      const findProfile = await this.profileModel.findOne({ account: id });
      if (findProfile) {
        throw new HttpException(
          {
            result: findProfile,
            status: HttpStatus.OK,
            message: 'Tải hồ sơ thành công',
          },
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          {
            result: null,
            status: HttpStatus.NOT_FOUND,
            message: 'Tài khoản chưa tạo hồ sơ',
          },
          HttpStatus.OK,
        );
      }
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.FORBIDDEN,
          message: 'Tài khoản không có quyền này',
        },
        HttpStatus.OK,
      );
    }
  }

  async updateProfile(role: Role, id: string, newProfile: CreateProfileDTO) {
    if (role === 'candidate') {
      const findProfile = await this.profileModel.findOne({ account: id });
      if (findProfile) {
        await this.profileModel.updateOne(
          { account: id },
          { ...newProfile, updateAt: new Date() },
          {
            new: true,
          },
        );
        throw new HttpException(
          {
            result: await this.profileModel.findOne({
              _id: findProfile._id,
            }),
            status: HttpStatus.OK,
            message: 'Cập nhật hồ sơ thành công',
          },
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          {
            result: null,
            status: HttpStatus.NOT_FOUND,
            message: 'Tài khoản chưa tạo hồ sơ',
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
