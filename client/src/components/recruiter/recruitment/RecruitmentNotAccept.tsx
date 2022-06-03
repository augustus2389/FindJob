import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../redux/hooks";
import { recruitmentSelectors } from "../../../redux/reducers/recruitment.reducer";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 70px;
  padding: 0 30px 50px 30px;
  background-color: rgba(0, 0, 0, 0.03);
`;
const Warning = styled.h1`
  text-align: center;
  margin-top: 100px;
`;
const RecruitmentNotAccept: React.FC = () => {
  const message = useAppSelector(recruitmentSelectors.isMessageSelector);
  return (
    <Wrapper>
      <Warning>⚠️{message}</Warning>
    </Wrapper>
  );
};

export default RecruitmentNotAccept;
