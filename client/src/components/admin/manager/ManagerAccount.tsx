/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "antd";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllAccountAction } from "../../../redux/action/auth";
import { useAppDispatch } from "../../../redux/hooks";
import TableManagerAccount from "./TableManagerAccount";

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
const ManagerAccount = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(getAllAccountAction());
  }, []);

  return (
    <Wrapper>
      <h1>Quản lý tài khoản</h1>
      <Button
        type="primary"
        onClick={() => {
          navigate("/account/create");
        }}
      >
        Thêm tài khoản
      </Button>
      <TableManagerAccount />
    </Wrapper>
  );
};

export default ManagerAccount;
