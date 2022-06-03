/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "antd";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  checkAddress,
  checkSalary,
  checkType,
  checkWorkExperience,
  checkWorkingForm,
} from "../../../config/data";
import { getRecuitmentAction } from "../../../redux/action/recruitment";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { recruitmentSelectors } from "../../../redux/reducers/recruitment.reducer";
import {
  cvSelectors,
  setMessageCv,
  setStatusCv,
} from "../../../redux/reducers/cv.reducer";
import mucLuong from "../../../asset/mucluong.svg";
import loainganh from "../../../asset/loainganh.svg";
import capbac from "../../../asset/capbac.svg";
import soluong from "../../../asset/soluong.svg";
import kinhnghiem from "../../../asset/kinhnghiem.svg";
import { ClockCircleOutlined, CloudUploadOutlined } from "@ant-design/icons";
import ModalSendCv from "../../modal/modalSendCv";
import { authSelectors } from "../../../redux/reducers/auth.reducer";
import { Role } from "../../../api/type/auth";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 30px 25px;
  background-color: #f0f0f0;
`;
const Title = styled.h2`
  border-left: 7px solid #00b14f;
  color: #333;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 16px;
  padding-left: 12px;
`;

const BoxHeader = styled.div`
  align-items: center;
  border-radius: 3px;
  display: flex;
  padding: 16px;
`;

const BoxCompanyLogo = styled.div`
  align-items: center;
  border: 2px solid #eee;
  border-radius: 75px;
  display: flex;
  height: 110px;
  overflow: hidden;
  width: 110px;
  background: #fff;
  padding: 4px;
  justify-content: center;
  img {
    max-height: 100% !important;
    object-fit: contain;
    width: 80%;
  }
`;

const BoxInfoJob = styled.div`
  flex-grow: 1;
  border-radius: 3px;
  padding: 16px;
  h1 {
    overflow-wrap: break-word;
    font-size: 22px;
    line-height: 29px;
    margin-bottom: 16px;
    margin-top: 0;
    color: #00b14f;
    font-weight: 700;
    margin: 0.67em 0;
  }
`;

const CompanyTitle = styled.div`
  margin-bottom: 8px;
  overflow-wrap: break-word;
  font-size: 18px;
  line-height: 29px;
  margin-top: 0;
  color: #333;
  font-weight: 700;
`;
const Box = styled.div`
  border-radius: 3px;
  padding: 16px;
  word-break: break-word;
  background-color: #fff;
  h2 {
    border-left: 7px solid #00b14f;
    color: #333;
    font-size: 22px;
    font-weight: 700;
    margin: 0 0 16px;
    padding-left: 12px;
    line-height: 1.1;
  }
`;

const BoxInfo = styled.div`
  background: #00b14f0d;
  border-radius: 3px;
  margin-bottom: 8px;
  padding: 16px 16px 0;
  p {
    color: #333;
    font-weight: 700;
    margin-bottom: 16px;
    -webkit-text-decoration-line: underline;
    text-decoration-line: underline;
  }
`;
const BoxMain = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;
const BoxItem = styled.div`
  display: flex;
  margin-bottom: 16px;
  img {
    height: 32px;
    margin-right: 16px;
    width: 32px;
  }
`;
const BoxAddress = styled.div`
  background: #00b14f0d;
  border-radius: 3px;
  padding: 16px;
  p {
    color: #333;
    font-weight: 700;
    margin-bottom: 16px;
    text-decoration-line: underline;
  }
`;
const DetailRecruitment: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [isShowModal, setIsShowModal] = useState(false);
  const recruitment = useAppSelector(
    recruitmentSelectors.getRecruitmentSelector
  );
  const account = useAppSelector(authSelectors.getAccountSelector);
  const status = useAppSelector(cvSelectors.isStatusSelector);
  const message = useAppSelector(cvSelectors.isMessageSelector);
  useLayoutEffect(() => {
    dispatch(getRecuitmentAction(params.id!));
  }, []);

  useEffect(() => {
    if (status === 200) {
      toast.success(message);
      dispatch(setStatusCv());
      dispatch(setMessageCv());
    } else if (status === 400) {
      toast.error(message);
      dispatch(setStatusCv());
      dispatch(setMessageCv());
    }
  }, [status]);

  return (
    <Wrapper>
      <Title>Chi tiết tin tuyển dụng</Title>
      <BoxHeader>
        <div style={{ marginRight: "24px" }}>
          <BoxCompanyLogo>
            <img src={recruitment?.imgUrl} alt="" />
          </BoxCompanyLogo>
        </div>
        <BoxInfoJob>
          <h1>{recruitment?.title}</h1>
          <CompanyTitle>{recruitment?.contact}</CompanyTitle>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <ClockCircleOutlined style={{ fontSize: "18px" }} />
            <span>Hạn nộp hồ sơ : {recruitment?.deadline}</span>
          </div>
        </BoxInfoJob>
        {account?.role === Role.CANDIDATE ? (
          <div>
            <Button
              type="primary"
              icon={<CloudUploadOutlined />}
              size="large"
              style={{ backgroundColor: "#00b14f", border: "none" }}
              onClick={() => {
                setIsShowModal(true);
              }}
            >
              Ứng tuyển ngay
            </Button>
            <ModalSendCv
              isShowModal={isShowModal}
              setIsShowModal={setIsShowModal}
            />
          </div>
        ) : null}
      </BoxHeader>
      <Box>
        <h2>Chi tiết tin tuyển dụng</h2>
        <BoxInfo>
          <p>Thông tin chung</p>
          <BoxMain>
            <BoxItem>
              <img src={mucLuong} alt="" />
              <div>
                <strong>Mức lương</strong>
                <br />
                <span>{checkSalary(recruitment?.salary!)}</span>
              </div>
            </BoxItem>
            <BoxItem>
              <img src={soluong} alt="" />
              <div>
                <strong>Số lượng tuyển</strong>
                <br />
                <span>{recruitment?.quantity}</span>
              </div>
            </BoxItem>
            <BoxItem>
              <img src={loainganh} alt="" />
              <div>
                <strong>Loại ngành</strong>
                <br />
                <span>{checkType(recruitment?.type!)}</span>
              </div>
            </BoxItem>
            <BoxItem>
              <img src={capbac} alt="" />
              <div>
                <strong>Cấp bậc</strong>
                <br />
                <span>Nhân viên</span>
              </div>
            </BoxItem>
            <BoxItem>
              <img src={kinhnghiem} alt="" />
              <div>
                <strong>Kinh nghiệm</strong>
                <br />
                <span>{checkWorkExperience(recruitment?.workExperience!)}</span>
              </div>
            </BoxItem>
            <BoxItem>
              <img src={loainganh} alt="" />
              <div>
                <strong>Hình thức làm việc</strong>
                <br />
                <span>{checkWorkingForm(recruitment?.workingForm!)}</span>
              </div>
            </BoxItem>
          </BoxMain>
        </BoxInfo>
        <BoxAddress>
          <p>Địa điểm làm việc</p>
          <div>
            <div style={{ marginBottom: "10px" }}>
              {checkAddress(recruitment?.address!)}
            </div>
          </div>
        </BoxAddress>
        <div>
          <h3 style={{ color: "#000", fontSize: "18px", fontWeight: "700" }}>
            Mô tả công việc
          </h3>
          <div style={{ wordBreak: "break-word" }}>
            <p>{recruitment?.description}</p>
          </div>
        </div>
      </Box>
    </Wrapper>
  );
};

export default DetailRecruitment;
