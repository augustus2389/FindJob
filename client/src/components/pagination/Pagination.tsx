import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import styled from "styled-components";

interface props {
  currenPage: number;
  perpage: number;
  totalPage: number;
  setStart: React.Dispatch<React.SetStateAction<number>>;
  setEnd: React.Dispatch<React.SetStateAction<number>>;
}
const StyledButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  gap: 5px;
`;
const Pagination = ({
  currenPage,
  perpage,
  totalPage,
  setEnd,
  setStart,
}: props) => {
  const getCurrenPage = (currenPage: number) => {
    setStart((currenPage - 1) * perpage);
    setEnd(currenPage * perpage);
  };
  const pageNumbers: number[] = [];
  for (let i = 2; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <StyledButton>
      <Button
        icon={<LeftOutlined />}
        onClick={() => {
          currenPage--;
          if (currenPage <= 1) {
            currenPage = 1;
          }
          getCurrenPage(currenPage);
        }}
      />
      <Button
        onClick={() => {
          getCurrenPage(1);
        }}
      >
        1
      </Button>
      {pageNumbers.map((value, index) => {
        return (
          <Button
            key={index}
            onClick={() => {
              const a = index + 1;
              getCurrenPage(a + 1);
            }}
          >
            {value}
          </Button>
        );
      })}
      <Button
        icon={<RightOutlined />}
        onClick={() => {
          currenPage++;
          if (currenPage > totalPage) {
            currenPage = totalPage;
          }
          getCurrenPage(currenPage);
        }}
      />
    </StyledButton>
  );
};

export default Pagination;
