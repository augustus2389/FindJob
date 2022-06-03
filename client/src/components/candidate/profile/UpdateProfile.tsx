/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import styled from "styled-components";
import { Profile } from "../../../api/type/profile";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getProfileAction,
  updateProfileAction,
} from "../../../redux/action/profile";
import { useNavigate } from "react-router-dom";
import {
  profileSelectors,
  setMessageProfile,
  setStatusProfile,
} from "../../../redux/reducers/profile.reducer";
import { toast } from "react-toastify";
import UploadImage from "../../upload/UploadImg";

const { Option } = Select;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0 30px 50px 30px;
  background-color: rgba(0, 0, 0, 0.03);
`;
const UpdateProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector(profileSelectors.getProfileSelector);
  const status = useAppSelector(profileSelectors.isStatusSelector);
  const message = useAppSelector(profileSelectors.isMessageSelector);
  const [imageUrl, setImageUrl] = useState(profile?.imgUrl!);

  const onFinish = ({
    email,
    birthday,
    experience,
    gender,
    address,
    branch,
    branchWant,
    endDay,
    firstDay,
    language,
    marry,
    rank,
    salary,
    schoolName,
    workForm,
    imgUrl,
    name,
    phone,
    skill,
    target,
  }: Profile) => {
    imgUrl = imageUrl;
    dispatch(
      updateProfileAction({
        birthday,
        email,
        experience,
        gender,
        address,
        branch,
        branchWant,
        endDay,
        firstDay,
        language,
        marry,
        rank,
        salary,
        schoolName,
        workForm,
        imgUrl,
        name,
        phone,
        skill,
        target,
      })
    );
    setTimeout(() => {
      navigate("/profile");
    }, 2500);
  };

  useEffect(() => {
    if (status === 200) {
      toast.success(message);
      dispatch(setStatusProfile());
      dispatch(setMessageProfile());
    } else if (status === 400) {
      toast.error(message);
      dispatch(setStatusProfile());
      dispatch(setMessageProfile());
    }
  });

  useEffect(() => {
    dispatch(getProfileAction());
  }, []);
  return (
    <Wrapper>
      <h1>Cập nhât hồ sơ cá nhân</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        autoComplete="off"
        style={{ marginTop: "30px" }}
        fields={[
          { name: ["name"], value: profile?.name },
          { name: ["email"], value: profile?.email },
          { name: ["phone"], value: profile?.phone },
          { name: ["skill"], value: profile?.skill },
          { name: ["gender"], value: profile?.gender },
          { name: ["target"], value: profile?.target },
          {
            name: ["birthday"],
            value: profile?.birthday,
          },
          { name: ["experience"], value: profile?.experience },
        ]}
      >
        <Form.Item name="gender" label="Giới tính">
          <Select placeholder="Hãy chọn giới tính" allowClear>
            <Option value="Nam">Nam</Option>
            <Option value="Nữ">Nữ</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Họ và tên" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Ngày sinh" name="birthday">
          <Input />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Học vấn" name="degree">
          <Input />
        </Form.Item>
        <Form.Item label="Kinh nghiệm" name="experience">
          <Input />
        </Form.Item>
        <Form.Item label="Kỹ năng" name="skill">
          <Input />
        </Form.Item>
        <Form.Item label="Sở thích" name="hobby">
          <Input />
        </Form.Item>
        <Form.Item label="Mục tiêu" name="target">
          <Input />
        </Form.Item>
        <Form.Item label="Hình ảnh" name="imgUrl">
          <UploadImage imageUrl={imageUrl!} setImageUrl={setImageUrl} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default UpdateProfile;
