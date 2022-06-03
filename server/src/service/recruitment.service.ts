/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, Status } from 'src/constant/enum';
import { CreateRecruitmentDTO } from 'src/dto/createRecruitmentDto';
import { Account, AccountDocument } from 'src/model/account.model';
import { Recruitment, RecruitmentDocument } from 'src/model/recruitment.model';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectModel(Recruitment.name)
    private recruitmentModel: Model<RecruitmentDocument>,
    @InjectModel(Account.name)
    private accountModel: Model<AccountDocument>,
  ) {}

  async findAll() {
    const allRecruitment = await this.recruitmentModel.find({ status: 1 });
    throw new HttpException(
      {
        result: allRecruitment,
        total: allRecruitment.length,
        status: HttpStatus.OK,
        message: 'Load danh sách bài đăng thành công',
      },
      HttpStatus.OK,
    );
  }

  async findAllNotAccept(role: Role) {
    if (role === Role.ADMIN) {
      const allRecruitment = await this.recruitmentModel
        .find({ status: 0 })
        .populate('writer');
      throw new HttpException(
        {
          result: allRecruitment,
          total: allRecruitment.length,
          status: HttpStatus.OK,
          message: 'Load danh sách bài đăng thành công',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          result: null,
          total: 0,
          status: HttpStatus.FORBIDDEN,
          message: 'Tài khoản không có chức năng này',
        },
        HttpStatus.OK,
      );
    }
  }

  async findAllCreator(id: string) {
    const allRecruitment = await this.recruitmentModel.find({ writer: id });
    if (allRecruitment) {
      throw new HttpException(
        {
          result: allRecruitment,
          total: allRecruitment.length,
          status: HttpStatus.OK,
          message: 'Load danh sách bài đăng thành công',
        },
        HttpStatus.OK,
      );
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

  async createRecruitment(
    status: boolean,
    userId: string,
    newRecruitment: CreateRecruitmentDTO,
  ) {
    if (status) {
      const findRecruitment = await this.recruitmentModel.find({
        writer: userId,
        status: false,
      });
      if (findRecruitment.length >= 1) {
        throw new HttpException(
          {
            result: null,
            status: HttpStatus.BAD_REQUEST,
            message:
              'Tài Khoản Này Có Bài Viết Chưa Được Phê Duyệt. Vui Lòng Chờ Quá Trình Phê Duyệt Hoàn Tất',
          },
          HttpStatus.OK,
        );
      } else {
        const findExistsRecruitment = await this.recruitmentModel.findOne({
          writer: userId,
          title: newRecruitment.title,
        });
        if (findExistsRecruitment) {
          throw new HttpException(
            {
              result: null,
              status: HttpStatus.BAD_REQUEST,
              message: 'Đã có bài đăng có tiêu đề này rồi !!!',
            },
            HttpStatus.OK,
          );
        }
        const findAccount = await this.accountModel.findOne({ _id: userId });
        const recruitment = await new this.recruitmentModel({
          ...newRecruitment,
          writer: userId,
          status: Status['Chưa phê duyệt'], 
          imgUrl: findAccount.imgUrl,
        }).save();
        const recruitmentObject = recruitment.toObject();
        throw new HttpException(
          {
            result: recruitmentObject,
            status: HttpStatus.OK,
            message: 'Tạo bài viết thành công',
          },
          HttpStatus.OK,
        );
      }
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.FORBIDDEN,
          message: 'Tài khoản này đã bị khóa',
        },
        HttpStatus.OK,
      );
    }
  }

  async updateRecruitment(
    status: boolean,
    userId: string,
    role: Role,
    id: string,
    newRecruitment: CreateRecruitmentDTO,
  ) {
    if (status) {
      const findRecruitment = await this.recruitmentModel.findOne({
        writer: userId,
        _id: id,
      });
      if (findRecruitment) {
        if (role === Role.RECRUITER) {
          const findAccount = await this.accountModel.findOne({ _id: userId });
          await this.recruitmentModel.updateOne(
            { writer: userId, _id: id },
            {
              ...newRecruitment,
              updateAt: new Date(),
              status: Status['Chưa phê duyệt'],
              imgUrl: findAccount.imgUrl,
            },
            {
              new: true,
            },
          );
          throw new HttpException(
            {
              result: await this.recruitmentModel.findOne({
                _id: findRecruitment._id,
              }),
              status: HttpStatus.OK,
              message: 'Cập nhật công việc thành công',
            },
            HttpStatus.OK,
          );
        }
      } else {
        throw new HttpException(
          {
            result: null,
            status: HttpStatus.NOT_FOUND,
            message: 'Không tìm thấy công việc',
          },
          HttpStatus.OK,
        );
      }
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.FORBIDDEN,
          message: 'Tài khoản này đã bị khóa',
        },
        HttpStatus.OK,
      );
    }
  }

  async updateRecruitmentAdmin(role: Role, id: string) {
    const findRecruitment = await this.recruitmentModel.findOne({
      _id: id,
    });
    if (findRecruitment) {
      if (role === Role.ADMIN) {
        await this.recruitmentModel.updateOne(
          { _id: id },
          { status: 1, updateAt: new Date() },
          {
            new: true,
          },
        );
        throw new HttpException(
          {
            result: await this.recruitmentModel.findOne({
              _id: findRecruitment._id,
            }),
            status: HttpStatus.OK,
            message: 'Cập nhật công việc thành công',
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
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.NOT_FOUND,
          message: 'Không tìm thấy công việc',
        },
        HttpStatus.OK,
      );
    }
  }

  async deleteRecruitment(id: string) {
    const findRecruitment = await this.recruitmentModel.findOne({
      _id: id,
    });
    if (!findRecruitment) {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.BAD_REQUEST,
          message: 'Không tìm thấy công việc',
        },
        HttpStatus.OK,
      );
    } else {
      const recruitmentObject = await this.recruitmentModel.findByIdAndRemove(
        id,
      );
      throw new HttpException(
        {
          result: recruitmentObject,
          status: HttpStatus.OK,
          message: 'Xóa công việc thành công',
        },
        HttpStatus.OK,
      );
    }
  }

  async getRecruitment(id: string) {
    const findRecruitment = await this.recruitmentModel.findOne({
      _id: id,
    });
    if (!findRecruitment) {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.BAD_REQUEST,
          message: 'Không tìm thấy công việc',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          result: findRecruitment,
          status: HttpStatus.OK,
          message: 'Xem công việc thành công',
        },
        HttpStatus.OK,
      );
    }
  }
}
