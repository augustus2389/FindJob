import { IResponse } from "./IResponse";
import { Sex } from "./profile";

export interface IRecruitmentRequest {
  id: string;
  updateRecruitment: Recruitment;
}

export interface Recruitment {
  _id?: string;
  phone: string;
  salary: Salary;
  imgUrl?: string;
  address: Address;
  type: Type;
  workingForm: WorkingForm;
  rank: Rank;
  workExperience: WorkExperience;
  quantity: string;
  contact: string;
  deadline: string;
  gender: Sex;
  degree: string;
  title: string;
  description: string;
  writer?: any;
  status?: Status;
  cv?: string[];
  createdAt?: string;
}

export interface IRecruitmentResponse extends IResponse {
  result: Recruitment;
}

export interface IRecruitmentArrayResponse extends IResponse {
  result: Recruitment[];
}

export enum Status {
  "Chưa phê duyệt",
  "Đã phê duyệt",
}

export enum Address {
  "Hà Nội",
  "Vinh",
  "Đà Nẵng",
  "Hồ Chí Minh",
}

export enum Type {
  "Bất Động Sản",
  "Công Nghệ Thông Tin",
  "Công Nghệ Thực Phẩm",
  "Cơ Khí Động Lực",
  "Dược Học",
  "Kinh Doanh Quốc Tế",
  "Kiến trúc",
  "Kế Toán",
  "Kỹ Thuật Xây Dựng",
  "Kỹ Thuật Ô Tô",
  "Luật",
  "Marketing",
  "Ngôn Ngữ Anh",
  "Quản Lý Đất Đai",
  "Quản Trị Khách Sạn",
  "Quản Trị Nhà Hàng",
  "Quản Trị Kinh Doanh",
  "Tài Chính Ngân Hàng",
  "Tài Nguyên Môi Trường",
  "Huấn luyện viên phòng tập",
  "Khác",
}

export enum WorkingForm {
  "Toàn thời gian",
  "Bán thời gian",
  "Thực tập",
  "Remote - Làm việc từ xa",
}

export enum Rank {
  "Nhân viên",
  "Trưởng nhóm",
  "Trưởng / Phó phòng",
  "Quản lý / Giám sát",
  "Trưởng chi nhánh",
  "Phó giám đốc",
  "Giám đốc",
  "Thực tập sinh",
}

export enum Salary {
  "Dưới 3 triệu",
  "3 - 5 triệu",
  "5 - 7 triệu",
  "7 - 10 triệu",
  "10 - 12 triệu",
  "12 - 15 triệu",
  "15 - 20 triệu",
  "20 - 25 triệu",
  "25 - 30 triệu",
  "Trên 30 triệu",
  "Thỏa thuận",
}

export enum WorkExperience {
  "Không yêu cầu kinh nghiệm",
  "Dưới 1 năm",
  "1 năm",
  "2 năm",
  "3 năm",
  "4 năm",
  "5 năm",
  "Trên 5 năm",
}
