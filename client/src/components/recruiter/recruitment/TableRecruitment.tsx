import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { checkStatus } from "../../../config/data";
import { filterRecruitment } from "../../../config/filterRecruitment";
import { getRecuitmentAction } from "../../../redux/action/recruitment";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { recruitmentSelectors } from "../../../redux/reducers/recruitment.reducer";
import Loading from "../../loading/Loading";
import ModalDeleteRecruitment from "../../modal/modalDeleteRecruitment";
import Pagination from "../../pagination/Pagination";
import { DataFilterRecruitment } from "./MyRecruitment";

const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
`;

const BodyTable = styled.tbody`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;
const StyledTr = styled.tr`
  width: 100%;
`;
const StyledTd = styled.td`
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 17px;
  color: black;
`;

const headers = [
  { key: "index", lable: "STT" },
  { key: "title", lable: "Tiêu đề" },
  { key: "createdAt", lable: "Ngày đăng" },
  { key: "status", lable: "Trạng thái" },
  { key: "action", lable: "Hành động" },
];

interface props {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataFilter: DataFilterRecruitment;
}
const TableRecruitment = ({
  isShowModal,
  setIsShowModal,
  dataFilter,
}: props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let currenPage = 1;
  const [perpage] = useState(5);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(perpage);

  const recruitments = useAppSelector(
    recruitmentSelectors.getRecruitmentsSelector
  );
  const totalPage = Math.ceil(recruitments?.length! / perpage);

  const loading = useAppSelector(recruitmentSelectors.isLoadingSelector);
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <StyledTable>
        <thead>
          <StyledTr>
            {headers.map((item) => {
              return <StyledTd key={item.key}>{item.lable}</StyledTd>;
            })}
          </StyledTr>
        </thead>
        <BodyTable>
          {filterRecruitment(recruitments)(dataFilter.address.index)(
            dataFilter.type.index
          )(dataFilter.rank.index)(dataFilter.salary.index)(
            dataFilter.workExperience.index
          )(dataFilter.workingForm.index)(dataFilter.name.nameString)?.map(
            (item, index) => {
              if (index >= start && index < end) {
                return (
                  <StyledTr key={index}>
                    <StyledTd>{index + 1}</StyledTd>
                    <StyledTd>{item.title}</StyledTd>
                    <StyledTd>
                      {moment(item.createdAt).format("DD/MM/YYYY - H:mm:SS A")}
                    </StyledTd>
                    <StyledTd>{checkStatus(item.status!)}</StyledTd>
                    <StyledTd>
                      <Button
                        type="primary"
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          navigate(`/recruitment/update/${item._id}`);
                        }}
                      >
                        <EditOutlined />
                        Sửa
                      </Button>
                      <Button
                        type="primary"
                        danger
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          setIsShowModal(true);
                          dispatch(getRecuitmentAction(item._id!));
                        }}
                      >
                        <DeleteOutlined />
                        Xóa
                      </Button>
                      <ModalDeleteRecruitment
                        recruitment={item}
                        isShowModal={isShowModal}
                        setIsShowModal={setIsShowModal}
                      />
                    </StyledTd>
                  </StyledTr>
                );
              }
              return null;
            }
          )}
        </BodyTable>
      </StyledTable>
      <Pagination
        currenPage={currenPage}
        perpage={perpage}
        setEnd={setEnd}
        setStart={setStart}
        totalPage={totalPage}
      />
    </div>
  );
};

export default TableRecruitment;
