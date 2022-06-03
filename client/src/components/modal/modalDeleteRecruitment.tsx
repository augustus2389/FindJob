import { Modal } from "antd";
import React from "react";
import styled from "styled-components";
import { Recruitment } from "../../api/type/recruitment";
import { deleteRecuitmentAction } from "../../redux/action/recruitment";
import { useAppDispatch } from "../../redux/hooks";
import {
  setStatusRecruitment,
} from "../../redux/reducers/recruitment.reducer";

interface Props {
  recruitment: Recruitment;
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const Title = styled.h2`
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
`;
const ModalDeleteRecruitment: React.FC<Props> = ({
  isShowModal,
  recruitment,
  setIsShowModal,
}) => {
  const dispatch = useAppDispatch();
  const handleOk = () => {
    dispatch(deleteRecuitmentAction(recruitment?._id!));
    setIsShowModal(false);
    dispatch(setStatusRecruitment());
  };

  const handleCancel = () => {
    setIsShowModal(false);
  };
  return (
    <Modal
      visible={isShowModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Có"
      cancelText="Không"
    >
      <Title>⚠️Bạn có muốn xóa bài đăng tuyển dụng không ?</Title>
    </Modal>
  );
};

export default ModalDeleteRecruitment;
