/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { getAllCreatorAction } from "../../../redux/action/recruitment";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { authSelectors } from "../../../redux/reducers/auth.reducer";
import { setStatusRecruitment } from "../../../redux/reducers/recruitment.reducer";
import TableRecruitment from "./TableRecruitment";

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

const StyledSearch = styled.div`
  display: flex;
  gap: 5px;
  & h3 {
    white-space: nowrap;
    margin: 0;
  }
`;

export interface DataFilterRecruitment {
  address: {
    index: number;
  };
  type: {
    index: number;
  };
  workingForm: {
    index: number;
  };
  salary: {
    index: number;
  };
  rank: {
    index: number;
  };
  workExperience: {
    index: number;
  };
  name: {
    nameString: string;
  };
}
const MyRecruitment: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataFilter, setDataFilter] = useState<DataFilterRecruitment>({
    address: { index: -1 },
    type: { index: -1 },
    salary: { index: -1 },
    rank: { index: -1 },
    workingForm: { index: -1 },
    workExperience: { index: -1 },
    name: { nameString: "" },
  });
  const account = useAppSelector(authSelectors.getAccountSelector);

  useEffect(() => {
    async function fetchData() {
      await dispatch(getAllCreatorAction());
      dispatch(setStatusRecruitment());
      // ...
    }
    fetchData();
  }, []);
  return (
    <Wrapper>
      <h1>Bài đăng của tôi</h1>
      <StyledSearch>
        <h3>Tìm bài đăng:</h3>
        <Input
          style={{ width: "15%", marginRight: "20px" }}
          onChange={(e) => {
            setDataFilter({
              ...dataFilter,
              name: { nameString: e.target.value },
            });
          }}
        />
        <Button
          type="primary"
          onClick={async () => {
            if (account?.status) {
              await dispatch(setStatusRecruitment());
              navigate("/recruitment/create");
            } else {
              toast.error("Hiện tại tài khoản đang bị cấm đăng bài!!!");
            }
          }}
        >
          Tạo bài
        </Button>
      </StyledSearch>
      <TableRecruitment
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        dataFilter={dataFilter}
      />
    </Wrapper>
  );
};

export default MyRecruitment;
