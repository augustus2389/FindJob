/* eslint-disable react-hooks/exhaustive-deps */
import {
  CaretDownOutlined,
  CaretUpOutlined,
  KeyOutlined,
  LogoutOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Popover } from "antd";
import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Role } from "../../api/type/auth";
import logo from "../../asset/logo.png";
import { getAccountAction } from "../../redux/action/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  authSelectors,
  setAccountAuth,
  setAuthorized,
  setStatusAuth,
  setToken,
} from "../../redux/reducers/auth.reducer";
import { setProfile } from "../../redux/reducers/profile.reducer";
import { removeAccessToken } from "../../untils/localStorageService";
const Wrapper = styled.div`
  height: 80px;
  padding-left: 25px;
  padding-right: 25px;
  right: 0;
  top: 0;
  left: 0;
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
`;
const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.div`
  width: 6%;
  img {
    width: 100%;
  }
`;
const NavLeft = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  gap: 2%;
  div {
    font-size: 14px;
    border-radius: 5px;
    color: #333;
    font-weight: 600;
    letter-spacing: 0.235px;
    margin: 16px 5px;
    padding: 13px 10px;
    cursor: pointer;

    :hover {
      color: #fff;
      background-image: linear-gradient(to bottom, #0071ff, #0130cb);
    }
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    color: #333;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
    :hover {
      color: #0130cb;
    }
  }
  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledButton = styled(Button)`
  border: none;
  margin-bottom: 5px;
`;
const ButtonRight = styled.div`
  border-radius: 5px;
  color: #333;
  font-weight: 600;
  letter-spacing: 0.235px;
  margin: 16px 5px;
  padding: 13px 10px;
  color: #0130cb;
  cursor: pointer;
`;
const Test = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isShowIcon, setIsShowIcon] = useState(false);
  const account = useAppSelector(authSelectors.getAccountSelector);
  
  const content = (
    <DropDown>
      <StyledButton
        icon={<KeyOutlined />}
        onClick={() => {
          navigate("/updatePass");
        }}
      >
        Đổi mật khẩu
      </StyledButton>
      <StyledButton
        icon={<LogoutOutlined />}
        onClick={() => {
          dispatch(setAuthorized());
          dispatch(setToken());
          dispatch(setAccountAuth());
          dispatch(setStatusAuth());
          dispatch(setProfile());
          removeAccessToken();
          toast.success("Đăng xuất thành công");
          navigate("/");
        }}
      >
        Đăng xuất
      </StyledButton>
    </DropDown>
  );

  useLayoutEffect(() => {
    dispatch(getAccountAction());
  }, [account?.passWord]);

  return (
    <Wrapper>
      <Main>
        <Logo>
          <img src={logo} alt="" />
        </Logo>
        <NavLeft>
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            Việc làm
          </div>
          {account?.role === Role.CANDIDATE ? (
            <div
              onClick={() => {
                navigate("/profile");
              }}
            >
              Hồ sơ
            </div>
          ) : null}
          {account?.role === Role.RECRUITER ? (
            <>
              <div
                onClick={() => {
                  navigate("/recruitment/myRecruitment");
                }}
              >
                Bài đăng
              </div>
              <div
                onClick={() => {
                  navigate("/profile/manager");
                }}
              >
                Quản lý hồ sơ
              </div>
            </>
          ) : null}
          {account?.role === Role.ADMIN ? (
            <>
              <div
                onClick={() => {
                  navigate("/account/manager");
                }}
              >
                Quản lý tài khoản
              </div>
              <div
                onClick={() => {
                  navigate("/recruitment/manager");
                }}
              >
                Quản lý bài đăng
              </div>
            </>
          ) : null}
        </NavLeft>
        {account ? (
          <NavRight
            style={{
              width: `${
                account?.role === Role.ADMIN
                  ? "20%"
                  : account?.role === Role.RECRUITER
                  ? "28%"
                  : account?.role === Role.CANDIDATE
                  ? "22%"
                  : null
              }`,
            }}
          >
            <MessageOutlined
              style={{ fontSize: "25px", color: "#0130CB", cursor: "pointer" }}
            />
            <div
              style={{
                border: "1px solid #0130CB ",
                padding: "5px",
                borderRadius: "30px",
              }}
            >
              {account?.imgUrl ? (
                <Avatar size="default" src={account.imgUrl} />
              ) : (
                <Avatar
                  size="default"
                  icon={<UserOutlined style={{ fontSize: "20px" }} />}
                />
              )}
              <Popover placement="bottom" content={content} trigger="click">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsShowIcon(!isShowIcon);
                  }}
                >
                  <span style={{overflow:'hidden',textOverflow:'ellipsis'}}>{account?.userName}</span>
                  {isShowIcon ? (
                    <CaretDownOutlined style={{ color: "black" }} />
                  ) : (
                    <CaretUpOutlined style={{ color: "black" }} />
                  )}
                </div>
              </Popover>
            </div>
            {account?.role === Role.CANDIDATE ? (
              <span
                style={{
                  borderLeft: "1px solid #333",
                  paddingLeft: "5px",
                  // whiteSpace: "nowrap",
                }}
              >
                Ứng viên
              </span>
            ) : account?.role === Role.RECRUITER ? (
              <span
                style={{
                  borderLeft: "1px solid #333",
                  paddingLeft: "5px",
                  // whiteSpace: "nowrap",
                }}
              >
                Nhà tuyển dụng
              </span>
            ) : (
              <span
                style={{
                  borderLeft: "1px solid #333",
                  paddingLeft: "5px",
                  // whiteSpace: "nowrap",
                }}
              >
                Quản trị viên
              </span>
            )}
          </NavRight>
        ) : (
          <NavRight style={{ justifyContent: "space-around", width: "18%" }}>
            <ButtonRight
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </ButtonRight>
            <ButtonRight
              style={{
                backgroundImage: "linear-gradient(to bottom, #0071FF, #0130CB)",
                color: "#fff",
                marginRight: "30px",
              }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Đăng kí
            </ButtonRight>
          </NavRight>
        )}
      </Main>
    </Wrapper>
  );
};

export default Test;
