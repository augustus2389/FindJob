/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { IAuthUpdatePass } from "../../api/type/auth";
import { updatePassAction } from "../../redux/action/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  authSelectors,
  setMessageAuth,
  setStatusAuth,
} from "../../redux/reducers/auth.reducer";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  font-style: oblique;
  color: rgb(4, 54, 153);
  margin: 0;
`;
const UpdatePass: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const messageLogin = useAppSelector(authSelectors.isMessageSelector);
  const status = useAppSelector(authSelectors.isStatusSelector);

  const onFinish = ({ oldPass, newPass }: IAuthUpdatePass) => {
    dispatch(updatePassAction({ oldPass, newPass }));
  };

  useEffect(() => {
    if (status === 200) {
      toast.success(messageLogin);
      dispatch(setMessageAuth());
      dispatch(setStatusAuth());
      navigate("/");
    } else if (status === 400) {
      toast.warning(messageLogin);
      dispatch(setMessageAuth());
      dispatch(setStatusAuth());
    }
  }, [status]);
  return (
    <Wrapper>
      <Title>Thay đổi mật khẩu</Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        autoComplete="off"
        style={{ marginTop: "30px" }}
      >
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPass"
          rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Mật khẩu mới"
          name="newPass"
          rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" htmlType="submit">
            Đổi
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default UpdatePass;
