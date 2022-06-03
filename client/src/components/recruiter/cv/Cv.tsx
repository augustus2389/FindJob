/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  getStatusFalseCvAction,
  getStatusTrueCvAction,
} from "../../../redux/action/cv";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  cvSelectors,
  setMessageCv,
  setStatusCv,
} from "../../../redux/reducers/cv.reducer";
import TableCv from "./TableCv";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 30px 50px 30px;
  /* background: -webkit-linear-gradient(left, #25c481, #25b7c4); */
  background: #f0f0f0;
`;
const StyledSelect = styled.select`
  width: 100px;
  height: 30px;
`;
const Cv = () => {
  const [isShowModalProfile, setIsShowModalProfile] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const dispatch = useAppDispatch();
  const status = useAppSelector(cvSelectors.isStatusSelector);
  const message = useAppSelector(cvSelectors.isMessageSelector);

  useEffect(() => {
    async function fetchData() {
      await dispatch(getStatusFalseCvAction());
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (status === 200) {
      toast.success(message);
      dispatch(setStatusCv());
      dispatch(setMessageCv());
    } else if (status === 404) {
      toast.error(message);
      dispatch(setStatusCv());
      dispatch(setMessageCv());
    } else if (status === 400) {
      toast.error(message);
      dispatch(setStatusCv());
      dispatch(setMessageCv());
    }
  });
  return (
    <Wrapper>
      <h1>Quản lý hồ sơ</h1>
      <StyledSelect
        defaultValue={0}
        onChange={(e) => {
          if (+e.target.value === 1) {
            dispatch(getStatusTrueCvAction());
          } else {
            dispatch(getStatusFalseCvAction());
          }
        }}
      >
        <option value={0}>Chưa duyệt</option>
        <option value={1}>Đã duyệt</option>
      </StyledSelect>
      <TableCv
        isShowModalDelete={isShowModalDelete}
        setIsShowModalDelete={setIsShowModalDelete}
        isShowModalProfile={isShowModalProfile}
        setIsShowModalProfile={setIsShowModalProfile}
      />
    </Wrapper>
  );
};

export default Cv;
