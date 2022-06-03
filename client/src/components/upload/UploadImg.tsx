import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { notification, Upload } from "antd";
import React, { useState } from "react";
interface IUploadFile {
  imageUrl: string;
  setImageUrl: (Url: string) => void;
}

const UploadImage: React.FC<IUploadFile> = ({ imageUrl, setImageUrl }) => {
  const [loadingImage, setLoadingImage] = useState(false);

  const uploadButton = (
    <div style={{ cursor: "pointer" }}>
      {loadingImage ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      notification.error({ message: "You can only upload JPG/PNG file!" });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      notification.error({ message: "Image must smaller than 2MB!" });
    }
    return isLt2M && isJpgOrPng;
  };

  const handleFileChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoadingImage(true);
      return;
    }
    if (info.file.status === "done") {
      setImageUrl(info.file.response);
      setLoadingImage(false);
    }
  };

  return (
    <>
      <Upload
        name="upload"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleFileChange}
        action={`http://localhost:8080/api/fileupload`}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default UploadImage;
