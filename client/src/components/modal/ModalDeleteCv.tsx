/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "antd";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { deleteCvAction } from "../../redux/action/cv";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  cvSelectors,
  setMessageCv,
  setStatusCv,
} from "../../redux/reducers/cv.reducer";

interface Props {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}
const Title = styled.h2`
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
`;
const ModalDeleteCv: React.FC<Props> = ({
  isShowModal,
  setIsShowModal,
  id,
}) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(cvSelectors.isStatusSelector);
  const message = useAppSelector(cvSelectors.isMessageSelector);

  const handleOk = () => {
    setIsShowModal(false);
    dispatch(deleteCvAction(id));
  };

  const handleCancel = () => {
    setIsShowModal(false);
  };

  useEffect(() => {
    if (status === 200) {
      toast.success(message);
      dispatch(setStatusCv());
      dispatch(setMessageCv());
    }
  }, [status]);

  return (
    <Modal
      visible={isShowModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Có"
      cancelText="Không"
    >
      <Title>⚠️Bạn có muốn xóa hồ sơ không ?</Title>
    </Modal>
  );
};

export default ModalDeleteCv;
