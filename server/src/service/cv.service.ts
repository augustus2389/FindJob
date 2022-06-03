import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/constant/enum';
import { CV, CVDocument } from 'src/model/cv.model';
import { Profile, ProfileDocument } from 'src/model/profile.model';
import { Recruitment, RecruitmentDocument } from 'src/model/recruitment.model';

@Injectable()
export class CVService {
  constructor(
    @InjectModel(CV.name) private cvModel: Model<CVDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    @InjectModel(Recruitment.name)
    private recruitmentModel: Model<RecruitmentDocument>,
  ) {}

  async createCV(
    status: boolean,
    role: Role,
    idUser: string,
    idRecruitment: string,
  ) {
    if (role === Role.CANDIDATE || status) {
      const findRecruitment = await this.recruitmentModel.findOne({
        _id: idRecruitment,
      });
      const findCv = await this.cvModel.find({
        writer: idUser,
        recruitment: idRecruitment,
      });
      const findProfile = await this.profileModel.findOne({
        account: idUser,
      });
      if (findCv.length >= 1) {
        throw new HttpException(
          {
            result: null,
            status: HttpStatus.BAD_REQUEST,
            message: 'Bạn đã gửi thông tin đến nhà tuyển dụng này rồi',
          },
          HttpStatus.OK,
        );
      }
      if (!findRecruitment) {
        throw new HttpException(
          {
            result: null,
            status: HttpStatus.NOT_FOUND,
            message: 'Không tìm thấy công việc',
          },
          HttpStatus.OK,
        );
      } else {
        const cv = await new this.cvModel({
          profile: findProfile,
          recruitment: idRecruitment,
          writer: idUser,
          receiver: findRecruitment.writer,
        }).save();
        const cvObject = cv.toObject();
        await this.recruitmentModel.updateOne(
          { _id: idRecruitment },
          { $push: { cv: cvObject._id } },
        );
        throw new HttpException(
          {
            result: cvObject,
            status: HttpStatus.OK,
            message: 'Gửi thông tin thành công',
          },
          HttpStatus.OK,
        );
      }
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.FORBIDDEN,
          message: 'Tài khoản này đã bị khóa hoặc không có quyền',
        },
        HttpStatus.OK,
      );
    }
  }

  async getCv(userId: string) {
    const findAllCv = await this.cvModel.find({ receiver: userId });
    if (findAllCv) {
      throw new HttpException(
        {
          result: findAllCv,
          total: findAllCv.length,
          status: HttpStatus.OK,
          message: 'Tải dữ liệu thành công',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.NOT_FOUND,
          message: 'Không có dữ liệu',
        },
        HttpStatus.OK,
      );
    }
  }

  async getStatusTrueCv(userId: string) {
    const findAllCv = await this.cvModel.find({
      receiver: userId,
      status: true,
    });
    if (findAllCv) {
      throw new HttpException(
        {
          result: findAllCv,
          total: findAllCv.length,
          status: HttpStatus.OK,
          message: 'Tải dữ liệu thành công',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.NOT_FOUND,
          message: 'Không có dữ liệu',
        },
        HttpStatus.OK,
      );
    }
  }

  async getStatusFalseCv(userId: string) {
    const findAllCv = await this.cvModel.find({
      receiver: userId,
      status: false,
    });
    if (findAllCv) {
      throw new HttpException(
        {
          result: findAllCv,
          total: findAllCv.length,
          status: HttpStatus.OK,
          message: 'Tải dữ liệu thành công',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.NOT_FOUND,
          message: 'Không có dữ liệu',
        },
        HttpStatus.OK,
      );
    }
  }

  async detailsCv(idUser: string, role: Role, idCv: string) {
    const findCv = await this.cvModel.findOne({ _id: idCv, receiver: idUser });
    if (role === Role.RECRUITER) {
      if (findCv) {
        throw new HttpException(
          {
            result: findCv,
            status: HttpStatus.OK,
            message: 'Tải dữ liệu thành công',
          },
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          {
            result: null,
            status: HttpStatus.NOT_FOUND,
            message: 'Không có dữ liệu',
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

  async deleteCv(idUser: string, role: Role, idCv: string) {
    const findCv = await this.cvModel.findOne({ _id: idCv, receiver: idUser });
    if (role === Role.RECRUITER) {
      if (findCv) {
        await this.cvModel.deleteOne({ _id: idCv, receiver: idUser });
        throw new HttpException(
          {
            result: findCv,
            status: HttpStatus.OK,
            message: 'Xóa thông tin thành công',
          },
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          {
            result: null,
            status: HttpStatus.NOT_FOUND,
            message: 'Không có dữ liệu',
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

  async updateStatusCv(idUser: string, role: Role, idCv: string) {
    const findCv = await this.cvModel.findOne({ _id: idCv, receiver: idUser });
    if (role === Role.RECRUITER) {
      if (findCv) {
        await this.cvModel.updateOne(
          { _id: idCv, receiver: idUser },
          { status: true },
        );
        throw new HttpException(
          {
            result: await this.cvModel.findOne({ _id: findCv._id }),
            status: HttpStatus.OK,
            message: 'Duyệt thông tin thành công',
          },
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          {
            result: null,
            status: HttpStatus.NOT_FOUND,
            message: 'Không có dữ liệu',
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
