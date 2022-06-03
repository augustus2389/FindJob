/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "antd";
import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import {
  checkAddress,
  checkSalary,
  checkType,
  dataAddress,
  dataRank,
  dataSalary,
  dataType,
  dataWorkExperience,
  dataWorkingForm,
} from "../../config/data";
import { filterRecruitment } from "../../config/filterRecruitment";
import { getAllRecuitmentAction } from "../../redux/action/recruitment";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { recruitmentSelectors } from "../../redux/reducers/recruitment.reducer";
import img from "../../asset/tuyen-dung.png";
import {
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import { authSelectors } from "../../redux/reducers/auth.reducer";

const Wrapper = styled.main`
  min-height:100vh;
  padding: 50px calc(3.5vw);
  position: relative;
  overflow-x: hidden;
  &:before {
    background: center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;
const Block = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2%;
  width: 100%;
  padding: 30px 0;
`;
const StyledFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const StyledSelect = styled.select`
  width: 70px;
  height: 30px;
`;
const StyledInput = styled.input`
  width: 200px;
  height: 30px;
`;
const Box = styled.div`
  background: linear-gradient(180deg, #fff, hsla(0, 0%, 100%, 0)), #fff;
  box-shadow: 0 4px 40px rgb(0 0 0 / 10%);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  -webkit-filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
  filter: drop-shadow(0 4px 40px rgba(0, 0, 0, 0.1));
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const CardAsset = styled.div`
  box-sizing: border-box;
  margin: 0px;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  cursor: pointer;
  background-position: 50%;
  background-size: cover;
`;

const BoxContent = styled.div`
  padding: 0 15px 32px;
  background: rgb(11, 20, 38);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 230px;
`;
const Title = styled.div`
  font-size: 18px;
  text-align: center;
  color: #fff;
  line-height: 26px;
  font-style: oblique;
  font-weight: 700;
  overflow: hidden;
  margin-bottom: 5px;
  text-overflow: ellipsis;
  text-decoration-line: underline;
  display: -webkit-box;
`;
const CardName = styled.div`
  font-size: 16px;
  color: #fff;
  line-height: 26px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
`;
const StyledButton = styled(Button)`
  margin-top: 10px;
`;
interface DataFilterRecruitment {
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
const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(8);
  const [dataFilter, setDataFilter] = useState<DataFilterRecruitment>({
    address: { index: -1 },
    type: { index: -1 },
    salary: { index: -1 },
    rank: { index: -1 },
    workingForm: { index: -1 },
    workExperience: { index: -1 },
    name: { nameString: "" },
  });
  const data = useAppSelector(recruitmentSelectors.getRecruitmentsSelector);
  const loading = useAppSelector(recruitmentSelectors.isLoadingSelector);
  const account = useAppSelector(authSelectors.getAccountSelector);

  useLayoutEffect(() => {
    dispatch(getAllRecuitmentAction());
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <StyledFilter>
        <SearchOutlined style={{ fontSize: "20px" }} />
        <StyledInput
          onChange={(e) => {
            setDataFilter({
              ...dataFilter,
              name: { nameString: e.target.value },
            });
          }}
          placeholder="Nhập tên công việc cần tìm ..."
        />
        <StyledSelect
          onChange={(e) => {
            setDataFilter({
              ...dataFilter,
              address: { index: +e.target.value },
            });
          }}
        >
          <option value={-1}>Địa chỉ</option>
          {/* -1 is value null */}
          {dataAddress.map((address, index) => (
            <option value={address.address} key={index}>
              {address.name}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect
          onChange={(e) => {
            setDataFilter({
              ...dataFilter,
              type: { index: +e.target.value },
            });
          }}
          style={{ width: "100px" }}
        >
          <option value={-1}>Ngành nghề</option>
          {/* -1 is value null */}
          {dataType.map((type, index) => (
            <option value={type.type} key={index}>
              {type.name}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect
          onChange={(e) => {
            setDataFilter({
              ...dataFilter,
              rank: { index: +e.target.value },
            });
          }}
          style={{ width: "80px" }}
        >
          <option value={-1}>Cấp bậc</option>
          {/* -1 is value null */}
          {dataRank.map((rank, index) => (
            <option value={rank.rank} key={index}>
              {rank.name}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect
          onChange={(e) => {
            setDataFilter({
              ...dataFilter,
              salary: { index: +e.target.value },
            });
          }}
          style={{ width: "90px" }}
        >
          <option value={-1}>Mức lương</option>
          {/* -1 is value null */}
          {dataSalary.map((salary, index) => (
            <option value={salary.salary} key={index}>
              {salary.name}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect
          onChange={(e) => {
            setDataFilter({
              ...dataFilter,
              workingForm: { index: +e.target.value },
            });
          }}
          style={{ width: "140px" }}
        >
          <option value={-1}>Hình thức làm việc</option>
          {/* -1 is value null */}
          {dataWorkingForm.map((item, index) => (
            <option value={item.typeWork} key={index}>
              {item.name}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect
          onChange={(e) => {
            setDataFilter({
              ...dataFilter,
              workExperience: { index: +e.target.value },
            });
          }}
          style={{ width: "160px" }}
        >
          <option value={-1}>Kinh nghiệm làm việc</option>
          {/* -1 is value null */}
          {dataWorkExperience.map((item, index) => (
            <option value={item.experience} key={index}>
              {item.name}
            </option>
          ))}
        </StyledSelect>
      </StyledFilter>
      <Block>
        {filterRecruitment(data)(dataFilter.address.index)(
          dataFilter.type.index
        )(dataFilter.rank.index)(dataFilter.salary.index)(
          dataFilter.workingForm.index
        )(dataFilter.workExperience.index)(dataFilter.name.nameString)
          ?.slice(0, count)
          .map((item, index) => {
            return (
              <Box key={index}>
                {item.imgUrl ? (
                  <CardAsset
                    style={{
                      backgroundImage: `url(${item.imgUrl})`,
                    }}
                  />
                ) : (
                  <CardAsset
                    style={{
                      backgroundImage: `url(${img})`,
                    }}
                  />
                )}
                <BoxContent>
                  <Title>{item.title}</Title>
                  <CardName>Ngành: {checkType(item.type)}</CardName>
                  <CardName>
                    <DollarOutlined style={{ marginRight: "5px" }} />{" "}
                    {checkSalary(item.salary)}
                  </CardName>
                  <CardName>
                    <EnvironmentOutlined style={{ marginRight: "5px" }} />{" "}
                    {checkAddress(item.address)}
                  </CardName>
                  <CardName>
                    <ClockCircleOutlined style={{ marginRight: "5px" }} />{" "}
                    {moment(item.createdAt).format("DD/MM/YYYY - H:mm:SS A")}
                  </CardName>
                  <StyledButton
                    type="primary"
                    onClick={() => {
                      if (!account) {
                        navigate("/login");
                      } else {
                        navigate(`recruitment/detail/${item._id}`);
                      }
                    }}
                  >
                    Xem thêm
                  </StyledButton>
                </BoxContent>
              </Box>
            );
          })}
      </Block>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <StyledButton
          onClick={() => {
            setCount(count + 6);
          }}
          type="primary"
          danger
        >
          Tải thêm
        </StyledButton>
      </div>
    </Wrapper>
  );
};

export default Home;
