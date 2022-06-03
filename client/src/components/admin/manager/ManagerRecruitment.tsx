/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import styled from "styled-components";
import {  getAllRecuitmentNotAcceptAction } from "../../../redux/action/recruitment";
import { useAppDispatch } from "../../../redux/hooks";
import TableManagerRecruitment from "./TableManagerRecruitment";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 30px 50px 30px;
  background-color: #f0f0f0;
  h1 {
    text-align: center;
    padding: 30px 0;
}
`;
const ManagerRecruitment = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(getAllRecuitmentNotAcceptAction());
    }
    fetchData();
  }, []);

  return (
    <Wrapper>
      <h1>Quản lý bài đăng</h1>
      <TableManagerRecruitment />
    </Wrapper>
  );
};

export default ManagerRecruitment;
