/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import styled from "styled-components";
import { Profile } from "../../../api/type/profile";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createProfileAction } from "../../../redux/action/profile";
import { useNavigate } from "react-router-dom";
import {
  profileSelectors,
  setMessageProfile,
  setStatusProfile,
} from "../../../redux/reducers/profile.reducer";
import { toast } from "react-toastify";
import UploadImage from "../../upload/UploadImg";
import {
  dataRank,
  dataSalary,
  dataType,
  dataWorkingForm,
} from "../../../config/data";

const { Option } = Select;

const validateMessages = {
  required: "Bắt buộc nhập ${label}!",
  types: {
    email: "${label} không đúng định dạng!",
    number: "${label} không đúng định dạng!",
  },
  string: {
    range: "${label} phải nhập trong khoảng ${min} và ${max} kí tự",
    len: "${label} phải có chính xác ${len} kí tự",
  },
  number: {
    range: "${label} phải nhập trong khoảng ${min} và ${max}",
  },
};

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0 30px 50px 30px;
  background-color: rgba(0, 0, 0, 0.03);
  h1 {
    text-align: center;
    padding: 30px 0;
    font-size: 50px;
    font-style: oblique;
    padding-bottom: 30px;
    color: rgb(4, 54, 153);
    margin: 0;
  }
`;
const CreateProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const status = useAppSelector(profileSelectors.isStatusSelector);
  const messageProfile = useAppSelector(profileSelectors.isMessageSelector);

  const onFinish = ({
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
    workForm,
    birthday,
    schoolName,
    name,
    phone,
    imgUrl,
    skill,
    target,
  }: Profile) => {
    imgUrl = imageUrl;
    dispatch(
      createProfileAction({
        birthday,
        email,
        experience,
        imgUrl,
        address,
        branch,
        branchWant,
        endDay,
        firstDay,
        language,
        marry,
        rank,
        schoolName,
        salary,
        workForm,
        gender,
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
      toast.success(messageProfile);
      dispatch(setStatusProfile());
      dispatch(setMessageProfile());
    } else if (status === 400) {
      toast.error(messageProfile);
      dispatch(setStatusProfile());
      dispatch(setMessageProfile());
    }
  });

  return (
    <Wrapper>
      <h1>Tạo hồ sơ xin việc</h1>
      <Form
        name="nest-messages"
        labelCol={{ span: 11 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        autoComplete="off"
        style={{ marginTop: "30px", display: "flex", flexDirection: "column" }}
        validateMessages={validateMessages}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          }}
        >
          <div>
            <h3 style={{ textAlign: "center", color: "#da6500" }}>
              Thông tin cá nhân
            </h3>
            <Form.Item label="Ảnh thẻ hồ sơ" name="imgUrl">
              <UploadImage imageUrl={imageUrl!} setImageUrl={setImageUrl} />
            </Form.Item>
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[
                {
                  required: true,
                  type: "string",
                  min: 3,
                  max: 25,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[{ required: true }]}
            >
              <Select placeholder="Hãy chọn giới tính" allowClear>
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="marry"
              label="Tình trạng hôn nhân "
              rules={[{ required: true }]}
            >
              <Select placeholder="Hãy chọn tình trạng hôn nhân" allowClear>
                <Option value="Độc thân">Độc thân</Option>
                <Option value="Đã kết hôn">Đã kết hôn</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="birthday"
              rules={[{ required: true }]}
            >
              <Input placeholder="dd/mm/yy" />
            </Form.Item>
            <h3 style={{ textAlign: "center", color: "#da6500" }}>
              Thông tin liên hệ
            </h3>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, type: "string", len: 10 }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <h3 style={{ textAlign: "center", color: "#da6500" }}>
              Học vấn/Ngoại ngữ
            </h3>
            <Form.Item
              label="Thời gian bắt đầu"
              name="firstDay"
              rules={[{ required: true }]}
            >
              {/* <Input /> */}
              <Input placeholder="dd/mm/yy" />
            </Form.Item>
            <Form.Item
              label="Thời gian kết thúc"
              name="endDay"
              rules={[{ required: true }]}
            >
              {/* <Input /> */}
              <Input placeholder="dd/mm/yy" />
            </Form.Item>
            <Form.Item
              label="Tên trường"
              name="schoolName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ngành học"
              name="branch"
              rules={[{ required: true }]}
            >
              <Select placeholder="Hãy chọn ngành học" allowClear>
                {dataType.map((item, index) => {
                  return (
                    <Option value={item.type} key={index}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Ngoại ngữ"
              name="language"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <h3 style={{ textAlign: "center", color: "#da6500" }}>
              Kinh nghiệm
            </h3>
            <Form.Item
              label="Số năm kinh nghiệm"
              name="experience"
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Kỹ năng"
              name="skill"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>
          <div>
            <h3 style={{ textAlign: "center", color: "#da6500" }}>Mục tiêu</h3>
            
            <Form.Item
              label="Mức lương mong muốn"
              name="salary"
              rules={[{ required: true }]}
            >
              <Select placeholder="Hãy chọn mức lương" allowClear>
                {dataSalary.map((item, index) => {
                  return (
                    <Option value={item.salary} key={index}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Cấp bậc mong muốn"
              name="rank"
              rules={[{ required: true }]}
            >
              <Select placeholder="Hãy chọn cấp bậc" allowClear>
                {dataRank.map((item, index) => {
                  return (
                    <Option value={item.rank} key={index}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Loại công việc"
              name="workForm"
              rules={[{ required: true }]}
            >
              <Select placeholder="Hãy chọn loại công việc" allowClear>
                {dataWorkingForm.map((item, index) => {
                  return (
                    <Option value={item.typeWork} key={index}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Ngành nghề mong muốn"
              name="branchWant"
              rules={[{ required: true }]}
            >
              <Select placeholder="Hãy chọn ngành" allowClear>
                {dataType.map((item, index) => {
                  return (
                    <Option value={item.type} key={index}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Mục tiêu nghề nghiệp"
              name="target"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          wrapperCol={{ offset: 8, span: 8 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button type="primary" htmlType="submit">
            Tạo
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default CreateProfile;
