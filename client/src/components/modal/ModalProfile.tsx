import { Button, Modal } from "antd";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import { Profile } from "../../api/type/profile";
import {
  checkRank,
  checkSalary,
  checkType,
  checkWorkingForm,
} from "../../config/data";

interface Props {
  profile: Profile;
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftBlock = styled.div`
  padding: 60px;
  background: #fff;
  box-shadow: 0 0 2px 1px rgb(0 0 0 / 12%);
  border-radius: 6px;
  margin: 0 20px;
`;

const Image = styled.img`
  width: 145px;
  border: 1px solid #d7d7db;
  height: 145px;
  max-width: 150px;
  max-height: 150px;
  object-fit: contain;
  margin-right: 30px;
  border-radius: 5px;
  vertical-align: middle;
`;

const Text = styled.span`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #0e1225;
  text-align: left;
  white-space: pre-line;
  margin-bottom: 0;
  word-break: break-word !important;
  word-wrap: break-word !important;
`;
const BoxTitle = styled.div`
  font-size: 18px;
  border-top: 1px solid #d7d7db;
  padding-top: 0.625rem;
  color: #da6500;
  text-align: left;
  margin-bottom: 0.625rem;
  font-weight: 700;
`;
const BoxContent = styled.div`
  margin: 0px 0px 20px 0px;
  white-space: pre-line;
`;
const Content = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;
const ContentLeft = styled.div`
  flex: 0 0 27%;
  max-width: 27%;
  font-size: 1rem;
  text-align: right;
  line-height: 1.2;
  padding-right: 0px !important;
  color: #0a587c;
  width: 100% !important;
  padding: 0 15px;
  font-weight: bold;
  white-space: nowrap;
`;
const ContentRight = styled.div`
  flex: 0 0 73%;
  max-width: 73%;
  margin-top: -3px;
  padding-left: 8px !important;
  width: 100% !important;
  padding: 0 15px;
  white-space: pre-line;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: #0e1225;
  text-align: left;
`;
const BoxFooter = styled.span`
  color: #000d2c;
  font-weight: bold;
  font-style: italic;
  padding-top: 1.5rem;
  justify-content: flex-end !important;
  display: flex !important;
  border-top: 1px solid #d7d7db !important;
  font-size: 1rem;
  line-height: 1.5;
  text-align: left;
`;
const ModalProfile: React.FC<Props> = ({
  isShowModal,
  setIsShowModal,
  profile,
}) => {
  const handleCancel = () => {
    setIsShowModal(false);
  };
  return (
    <Modal
      visible={isShowModal}
      onCancel={handleCancel}
      width={1100}
      footer={[
        <Button onClick={handleCancel} type="primary">
          Đóng
        </Button>,
      ]}
    >
      <LeftBlock id="table">
        <div>
          <div style={{ margin: "0 0 20px 0", whiteSpace: "pre-line" }}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div style={{ boxSizing: "border-box" }}>
                <Image src={profile.imgUrl} />
              </div>
              <div style={{ flex: "1" }}>
                <div
                  style={{
                    display: "flex",
                    color: "#000D2C",
                    fontWeight: "600",
                    fontSize: "35px",
                    marginBottom: "18px",
                  }}
                >
                  {profile.name}
                </div>
                <Text>Hồ sơ xin việc</Text>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>
                    Giới tính:
                    <Text
                      style={{
                        color: "#000D2C",
                        fontWeight: "bold",
                        marginLeft: "5px",
                      }}
                    >
                      {profile.gender}
                    </Text>
                  </Text>
                  <Text>
                    Ngày sinh:
                    <Text
                      style={{
                        color: "#000D2C",
                        fontWeight: "bold",
                        marginLeft: "5px",
                      }}
                    >
                      {profile.birthday}
                    </Text>
                  </Text>
                </div>
                <Text>
                  Tình trạng hôn nhân:
                  <Text
                    style={{
                      color: "#000D2C",
                      fontWeight: "bold",
                      marginLeft: "5px",
                    }}
                  >
                    {profile.marry}
                  </Text>
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "block" }}>
          <BoxTitle>Thông tin liên hệ</BoxTitle>
          <BoxContent>
            <Content>
              <ContentLeft>Địa chỉ:</ContentLeft>
              <ContentRight>{profile.address}</ContentRight>
            </Content>
            <Content>
              <ContentLeft>Điện thoại:</ContentLeft>
              <ContentRight>{profile.phone}</ContentRight>
            </Content>
            <Content>
              <ContentLeft>E-mail:</ContentLeft>
              <ContentRight>{profile.email}</ContentRight>
            </Content>
          </BoxContent>
        </div>
        <div style={{ display: "block" }}>
          <BoxTitle>Học vấn/Ngoại ngữ</BoxTitle>
          <BoxContent>
            <Content>
              <ContentLeft>
                {profile.firstDay} - {profile.endDay}:
              </ContentLeft>
              <ContentRight>{profile.schoolName}</ContentRight>
            </Content>
            <Content>
              <ContentLeft>Ngành:</ContentLeft>
              <ContentRight>{checkType(profile.branch)}</ContentRight>
            </Content>
            <Content>
              <ContentLeft>Ngoại ngữ:</ContentLeft>
              <ContentRight>{profile.language}</ContentRight>
            </Content>
          </BoxContent>
        </div>
        <div style={{ display: "block" }}>
          <BoxTitle>Kinh nghiệm làm việc</BoxTitle>
          <BoxContent>
            <Content>
              <ContentLeft>Số năm kinh nghiệm:</ContentLeft>
              <ContentRight>{profile.experience}</ContentRight>
            </Content>
          </BoxContent>
        </div>
        <div style={{ display: "block" }}>
          <BoxTitle>Kỹ năng</BoxTitle>
          <BoxContent>
            <Content>
              <ContentLeft />
              <ContentRight>{profile.skill}</ContentRight>
            </Content>
          </BoxContent>
        </div>
        <div style={{ display: "block" }}>
          <BoxTitle>Mục tiêu</BoxTitle>
          <BoxContent>
            <Content>
              <ContentLeft>Mức lương mong muốn:</ContentLeft>
              <ContentRight>{checkSalary(profile.salary)}</ContentRight>
            </Content>
            <Content>
              <ContentLeft>Cấp bậc mong muốn:</ContentLeft>
              <ContentRight>{checkRank(profile.rank)}</ContentRight>
            </Content>
            <Content>
              <ContentLeft>Loại công việc:</ContentLeft>
              <ContentRight>{checkWorkingForm(profile.workForm)}</ContentRight>
            </Content>
            <Content>
              <ContentLeft>Ngành nghề mong muốn:</ContentLeft>
              <ContentRight>{checkType(profile.branchWant)}</ContentRight>
            </Content>
            <Content>
              <ContentLeft>Mục tiêu nghề nghiệp:</ContentLeft>
              <ContentRight>{profile.target}</ContentRight>
            </Content>
          </BoxContent>
        </div>
        <div style={{ display: "block" }}>
          <BoxFooter>
            Cập nhật lần cuối: {moment(profile.createdAt).format("DD/MM/YYYY")}
          </BoxFooter>
        </div>
      </LeftBlock>
    </Modal>
  );
};

export default ModalProfile;
