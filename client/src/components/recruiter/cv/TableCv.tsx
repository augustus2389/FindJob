import {
  CheckOutlined,
  DeleteOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import moment from "moment";
import { useState } from "react";
import styled from "styled-components";
import { updateStatusCvAction } from "../../../redux/action/cv";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { cvSelectors } from "../../../redux/reducers/cv.reducer";
import ModalDeleteCv from "../../modal/ModalDeleteCv";
import ModalProfile from "../../modal/ModalProfile";
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
`;

const headers = [
  { key: "index", lable: "STT" },
  { key: "name", lable: "Họ và tên" },
  { key: "email", lable: "Email" },
  { key: "createdAt", lable: "Ngày nạp" },
  { key: "action", lable: "Hành động" },
];
interface props {
  isShowModalProfile: boolean;
  setIsShowModalProfile: React.Dispatch<React.SetStateAction<boolean>>;
  isShowModalDelete: boolean;
  setIsShowModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
const TableCv = ({
  isShowModalProfile,
  setIsShowModalProfile,
  isShowModalDelete,
  setIsShowModalDelete,
}: props) => {
  const dispatch = useAppDispatch();
  let currenPage = 1;
  const [perpage] = useState(4);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(perpage);
  const cvs = useAppSelector(cvSelectors.getCvsSelector);
  const totalPage = Math.ceil(cvs?.length! / perpage);

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
          {cvs?.map((item, index) => {
            if (!item.status) {
              if (index >= start && index < end) {
                return (
                  <StyledTr key={index}>
                    <StyledTd>{index + 1}</StyledTd>
                    <StyledTd>{item.profile.name}</StyledTd>
                    <StyledTd>{item.profile.email}</StyledTd>
                    <StyledTd>
                      {" "}
                      {moment(item.createdAt).format("DD/MM/YYYY - H:MM:SS A")}
                    </StyledTd>
                    <StyledTd>
                      <Button
                        type="primary"
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          setIsShowModalProfile(true);
                        }}
                      >
                        <IdcardOutlined />
                        Xem
                      </Button>
                      <ModalProfile
                        isShowModal={isShowModalProfile}
                        profile={item.profile}
                        setIsShowModal={setIsShowModalProfile}
                      />
                      <Button
                        type="primary"
                        danger
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          dispatch(updateStatusCvAction(item._id));

                        }}
                      >
                        <CheckOutlined />
                        Duyệt
                      </Button>
                    </StyledTd>
                  </StyledTr>
                );
              }
              return null;
            } else {
              if (index >= start && index < end) {
                return (
                  <StyledTr key={index}>
                    <StyledTd>{index + 1}</StyledTd>
                    <StyledTd>{item.profile.name}</StyledTd>
                    <StyledTd>{item.profile.email}</StyledTd>
                    <StyledTd>
                      {" "}
                      {moment(item.createdAt).format("DD/MM/YYYY - H:mm:SS A")}
                    </StyledTd>
                    <StyledTd>
                      <Button
                        type="primary"
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          setIsShowModalProfile(true);
                        }}
                      >
                        <IdcardOutlined />
                        Xem
                      </Button>
                      <ModalProfile
                        isShowModal={isShowModalProfile}
                        profile={item.profile}
                        setIsShowModal={setIsShowModalProfile}
                      />
                      <Button
                        type="primary"
                        danger
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          setIsShowModalDelete(true);
                        }}
                      >
                        <DeleteOutlined />
                        Xóa
                      </Button>
                      <ModalDeleteCv
                        isShowModal={isShowModalDelete}
                        setIsShowModal={setIsShowModalDelete}
                        id={item._id}
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

export default TableCv;
