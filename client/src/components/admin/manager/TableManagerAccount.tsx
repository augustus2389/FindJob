/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { Button } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Role } from "../../../api/type/auth";
import {
  deleteAccountAction,
  updateStatusAction,
} from "../../../redux/action/auth";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  authSelectors,
  setMessageAuth,
  setStatusAuth,
  setUpdateAccountAuth,
} from "../../../redux/reducers/auth.reducer";
import {
  setMessageRecruitment,
  setStatusRecruitment,
} from "../../../redux/reducers/recruitment.reducer";
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
  { key: "userName", lable: "Tên tài khoản" },
  { key: "createdAt", lable: "Ngày tạo" },
  { key: "role", lable: "Loại" },
  { key: "action", lable: "Hành động" },
];

const TableManagerAccount = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  let currenPage = 1;
  const [perpage] = useState(4);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(perpage);
  const accounts = useAppSelector(authSelectors.getAccountsSelector);
  const status = useAppSelector(authSelectors.isStatusSelector);
  const message = useAppSelector(authSelectors.isMessageSelector);
  const totalPage = Math.ceil(accounts?.length! / perpage);

  useEffect(() => {
    if (status === 200) {
      toast.success(message);
      dispatch(setStatusAuth());
      dispatch(setMessageAuth());
    } else if (status === 404) {
      toast.error(message);
      dispatch(setStatusRecruitment());
      dispatch(setMessageRecruitment());
    } else if (status === 400) {
      toast.warning(message);
      dispatch(setStatusRecruitment());
      dispatch(setMessageRecruitment());
    }
  }, [status]);
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
          {accounts?.map((item, index) => {
            if (index >= start && index < end) {
              return (
                <StyledTr key={index}>
                  <>
                    <StyledTd>{index + 1}</StyledTd>
                    <StyledTd>{item.userName}</StyledTd>
                    <StyledTd>
                      {moment(item.createdAt).format("DD/MM/YYYY - H:mm:SS A")}
                    </StyledTd>
                    {item.role === Role.CANDIDATE ? (
                      <StyledTd>Ứng viên</StyledTd>
                    ) : item.role === Role.RECRUITER ? (
                      <StyledTd>Nhà tuyển dụng</StyledTd>
                    ) : null}
                    <StyledTd>
                      {item.status  ? (
                        <Button
                          type="primary"
                          style={{
                            marginRight: "10px",
                          }}
                          onClick={() => {
                            dispatch(updateStatusAction(item._id!));
                          }}
                        >
                          Khóa
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          style={{
                            marginRight: "10px",
                            backgroundColor: "#00b14f",
                          }}
                          onClick={() => {
                            dispatch(updateStatusAction(item._id!));
                          }}
                        >
                          Mở khóa
                        </Button>
                      )}
                      <Button
                        type="primary"
                        danger
                        style={{
                          marginRight: "10px",
                        }}
                        onClick={() => {
                          dispatch(deleteAccountAction(item._id!))
                        }}
                      >
                        Xóa
                      </Button>
                    </StyledTd>
                  </>
                </StyledTr>
              );
            }
            return null;
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

export default TableManagerAccount;
