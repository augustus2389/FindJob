import { ArrowUpOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";

const ScrollBackTop: React.FC = () => {
  const [back, setBack] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setBack(true);
      } else {
        setBack(false);
      }
    });
  });

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {back && (
        <Button
          type="primary"
          danger
          style={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            height: "50px",
            width: "50px",
            fontSize: "50px",
            zIndex: "9999",
            borderRadius:"5px"
          }}
          onClick={scrollUp}
          icon={<ArrowUpOutlined style={{fontSize:"25px"}}/>}
        ></Button>
      )}
    </>
  );
};

export default ScrollBackTop;
