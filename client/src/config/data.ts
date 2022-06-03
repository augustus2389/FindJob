export const dataStatus = [
  { status: 0, name: "Chưa phê duyệt" },
  { status: 1, name: "Đã phê duyệt" },
];

export const checkStatus = (status: number | null): string => {
  if (status || status === 0) {
    const data = dataStatus.filter((item) => item.status === status);
    return data[0].name;
  }
  return "";
};

export const dataAddress = [
  { address: 0, name: "Hà Nội" },
  { address: 1, name: "Đà Nẵng" },
  { address: 2, name: "Hồ Chí Minh" },
  { address: 3, name: "Vinh" },
];

export const checkAddress = (address: number | null): string => {
  if (address || address === 0) {
    const data = dataAddress.filter((item) => item.address === address);
    return data[0].name;
  }
  return "";
};

export const dataWorkingForm = [
  { typeWork: 0, name: "Toàn thời gian" },
  { typeWork: 1, name: "Bán thời gian" },
  { typeWork: 2, name: "Thực tập" },
  { typeWork: 3, name: "Remote - Làm việc từ xa" },
];

export const checkWorkingForm = (typeWork: number | null): string => {
  if (typeWork || typeWork === 0) {
    const data = dataWorkingForm.filter((item) => item.typeWork === typeWork);
    return data[0].name;
  }
  return "";
};

export const dataRank = [
  { rank: 0, name: "Nhân viên" },
  { rank: 1, name: "Trưởng nhóm" },
  { rank: 2, name: "Trưởng / Phó phòng" },
  { rank: 3, name: "Quản lý / Giám sát" },
  { rank: 4, name: "Trưởng chi nhánh" },
  { rank: 5, name: "Phó giám đốc" },
  { rank: 6, name: "Giám đốc" },
  { rank: 7, name: "Thực tập sinh" },
];

export const checkRank = (rank: number | null): string => {
  if (rank || rank === 0) {
    const data = dataRank.filter((item) => item.rank === rank);
    return data[0].name;
  }
  return "";
};

export const dataWorkExperience = [
  { experience: 0, name: "Không yêu cầu kinh nghiệm" },
  { experience: 1, name: "Dưới 1 năm" },
  { experience: 2, name: "1 năm" },
  { experience: 3, name: "2 năm" },
  { experience: 4, name: "3 năm" },
  { experience: 5, name: "4 năm" },
  { experience: 6, name: "5 năm" },
  { experience: 7, name: "Trên 5 năm" },
];

export const checkWorkExperience = (experience: number | null): string => {
  if (experience || experience === 0) {
    const data = dataWorkExperience.filter(
      (item) => item.experience === experience
    );
    return data[0].name;
  }
  return "";
};

export const dataSalary = [
  { salary: 0, name: "Dưới 3 triệu" },
  { salary: 1, name: "3 - 5 triệu" },
  { salary: 2, name: "5 - 7 triệu" },
  { salary: 3, name: "7 - 10 triệu" },
  { salary: 4, name: "10 - 12 triệu" },
  { salary: 5, name: "12 - 15 triệu" },
  { salary: 6, name: "15 - 20 triệu" },
  { salary: 7, name: "20 - 25 triệu" },
  { salary: 8, name: "25 - 30 triệu" },
  { salary: 9, name: "Trên 30 triệu" },
  { salary: 10, name: "Thỏa thuận" },
];

export const checkSalary = (salary: number | null): string => {
  if (salary || salary === 0) {
    const data = dataSalary.filter((item) => item.salary === salary);
    return data[0].name;
  }
  return "";
};

export const dataType = [
  { type: 0, name: "Bất Động Sản" },
  { type: 1, name: "Công Nghệ Thông Tin" },
  { type: 2, name: "Công Nghệ Thực Phẩm" },
  { type: 3, name: "Cơ Khí Động Lực" },
  { type: 4, name: "Dược Học" },
  { type: 5, name: "Kinh Doanh Quốc Tế" },
  { type: 6, name: "Kiến trúc" },
  { type: 7, name: "Kế Toán" },
  { type: 8, name: "Kỹ Thuật Xây Dựng" },
  { type: 9, name: "Kỹ Thuật Ô Tô" },
  { type: 10, name: "Luật" },
  { type: 11, name: "Marketing" },
  { type: 12, name: "Ngôn ngữ Anh" },
  { type: 13, name: "Quản Lý Đất Đai" },
  { type: 14, name: "Quản Trị Khách Sạn" },
  { type: 15, name: "Quản Trị Nhà Hàng" },
  { type: 16, name: "Quản Trị Kinh Doanh" },
  { type: 17, name: "Tài Chính Ngân Hàng" },
  { type: 18, name: "Tài Nguyên Môi Trường" },
  { type: 19, name: "Huấn luyện viên phòng tập" },
  { type: 20, name: "Khác" },
];

export const checkType = (type: number | null): string => {
  if (type || type === 0) {
    const data = dataType.filter((item) => item.type === type);
    return data[0].name;
  }
  return "";
};
