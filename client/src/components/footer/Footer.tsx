import styled from "styled-components";
import {
  InstagramOutlined,
  TwitterOutlined,
  MediumOutlined,
  AntCloudOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const Wrapper = styled.div`
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
  flex-direction: row;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #0b1426;
  box-sizing: border-box;
  display: flex;
`;
const IconSocial = styled.div`
  display: flex;
  gap: 24px;
  margin-right: 24px;
  font-size: 14px;
  align-items: center;
`;
const TextCopyright = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  line-height: 1.3em;
  color: rgb(255, 255, 255);
  display: inline-block;
  font-size: 14px;
  font-weight: normal;
`;
const TextPrivacy = styled.div`
  display: block;
  font-size: 14px;
  color: lightgrey;
  font-weight: normal;
`;
const Text = styled.div`
  margin-left: 24px;
  cursor: pointer;
  box-sizing: border-box;
  line-height: 1.3em;
  color: lightgrey;
  display: inline-block;
  font-size: 14px;
  font-weight: normal;
`;
const FooterLeft = styled.div`
  display: block;
`;

export default function Footer() {
  return (
    <Wrapper>
      <FooterLeft>
        <IconSocial>
          <InstagramOutlined
            style={{
              color: "#fff",
              fontSize: "25px",
              cursor: "pointer",
            }}
          />
          <TwitterOutlined
            style={{
              color: "#fff",
              fontSize: "25px",
              cursor: "pointer",
            }}
          />
          <MediumOutlined
            style={{
              color: "#fff",
              fontSize: "25px",
              cursor: "pointer",
            }}
          />
          <AntCloudOutlined
            style={{
              color: "#fff",
              fontSize: "25px",
              cursor: "pointer",
            }}
          />
          <YoutubeOutlined
            style={{
              color: "#fff",
              fontSize: "25px",
              cursor: "pointer",
            }}
          />
        </IconSocial>
        <TextCopyright>Copyright © 2022 Duy Hau Company</TextCopyright>
      </FooterLeft>
      <TextPrivacy>
        <Text>Help Center</Text>
        <Text>T&C</Text>
        <Text>Privacy Notice</Text>
      </TextPrivacy>
    </Wrapper>
  );
}
