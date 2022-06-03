/* eslint-disable array-callback-return */
import { Button } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { updateAdminAction } from "../../../redux/action/recruitment";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  recruitmentSelectors,
  setMessageRecruitment,
  setStatusRecruitment,
} from "../../../redux/reducers/recruitment.reducer";
import ModalDeleteRecruitment from "../../modal/modalDeleteRecruitment";
import Pagination from "../../pagination/Pagination";

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
  white-space: nowrap;
`;
const headers = [
  { key: "index", lable: "STT" },
  { key: "name", lable: "Tiêu đề" },
  { key: "email", lable: "Tài khoản" },
  { key: "createdAt", lable: "Ngày đăng" },
  { key: "action", lable: "Hành động" },
];

const TableManagerRecruitment = () => {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  let currenPage = 1;
  const [perpage] = useState(4);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(perpage);
  const recruitments = useAppSelector(
    recruitmentSelectors.getRecruitmentsSelector
  );
  const status = useAppSelector(recruitmentSelectors.isStatusSelector);
  const message = useAppSelector(recruitmentSelectors.isMessageSelector);
  const totalPage = Math.ceil(recruitments?.length! / perpage);
  useEffect(() => {
    if (status === 200) {
      toast.success(message);
      dispatch(setStatusRecruitment());
      dispatch(setMessageRecruitment());
    } else if (status === 404) {
      toast.error(message);
      dispatch(setStatusRecruitment());
      dispatch(setMessageRecruitment());
    }
  });
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
          {recruitments?.map((item, index) => {
            if (!item.status) {
              if (index >= start && index < end) {
                return (
                  <StyledTr key={index}>
                    <StyledTd>{index + 1}</StyledTd>
                    <StyledTd>{item.title}</StyledTd>
                    <StyledTd>{item.writer.email}</StyledTd>
                    <StyledTd>
                      {moment(item.createdAt).format("DD/MM/YYYY - H:mm:SS A")}
                    </StyledTd>
                    <StyledTd>
                      <Link
                        target="_blank"
                        to={`/recruitment/detail/${item._id}`}
                      >
                        <Button type="primary" style={{ marginRight: "10px" }}>
                          Xem
                        </Button>
                      </Link>
                      <Button
                        type="primary"
                        style={{
                          marginRight: "10px",
                          backgroundColor: "#00b14f",
                        }}
                        onClick={() => {
                          dispatch(updateAdminAction(item._id!));
                        }}
                      >
                        Duyệt
                      </Button>
                      <Button
                        type="primary"
                        danger
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          setIsShowModal(true);
                        }}
                      >
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
          })}
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

export default TableManagerRecruitment;
