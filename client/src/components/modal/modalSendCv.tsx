import { Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Role } from "../../api/type/auth";
import { createCvAction } from "../../redux/action/cv";
import { getRecuitmentAction } from "../../redux/action/recruitment";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { authSelectors } from "../../redux/reducers/auth.reducer";
import { cvSelectors, setMessageCv } from "../../redux/reducers/cv.reducer";
import { profileSelectors } from "../../redux/reducers/profile.reducer";
import {
  recruitmentSelectors,
  setStatusRecruitment,
} from "../../redux/reducers/recruitment.reducer";

interface Props {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const Title = styled.h2`
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
`;
const ModalSendCv: React.FC<Props> = ({ isShowModal, setIsShowModal }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const recruitment = useAppSelector(
    recruitmentSelectors.getRecruitmentSelector
  );
  const account = useAppSelector(authSelectors.getAccountSelector);
  const profile = useAppSelector(profileSelectors.getProfileSelector);
  const handleOk = () => {
    if (account?.role === Role.ADMIN || account?.role === Role.RECRUITER) {
      toast.warning("Không có chức năng này");
      setIsShowModal(false);
    } else {
      if (profile === null) {
        navigate("/profile");
        setIsShowModal(false);
        toast.warning("Hồ sơ hiện nay chưa có ");
      } else {
        dispatch(createCvAction(recruitment?._id!));
        setIsShowModal(false);
        dispatch(getRecuitmentAction(recruitment?._id!));
        dispatch(setMessageCv());
      }
    } 
  };

  const handleCancel = () => {
    setIsShowModal(false);
  };
  return (
    <Modal
      visible={isShowModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Gửi"
      cancelText="Không"
    >
      <Title>⚠️Bạn có chắc chắn sẽ gửi hồ sơ ?</Title>
      <Title>
        Vui lòng kiểm tra lại hồ sơ cá nhân <a href="/profile">Tại đây</a>
      </Title>
    </Modal>
  );
};

export default ModalSendCv;
