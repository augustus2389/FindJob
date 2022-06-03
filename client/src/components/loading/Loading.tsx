import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
const StyledLoading = styled(LoadingOutlined)`
  font-size: 70px;
`;
const Loading: React.FC = () => {
  return (
    <Wrapper>
      <StyledLoading />
    </Wrapper>
  );
};

export default Loading;
