import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as S from "./styled";
import { FiUpload } from "react-icons/fi";

interface Props {
  onFileUpload: (file: File) => void;
}
const Dropzone: React.FC<Props> = ({ onFileUpload }) => {

  const [selectFileUrlState, setSselectFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);
      setSselectFileUrl(fileUrl);
      onFileUpload(file);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <S.DropzoneContainer {...getRootProps()}>
      
      <input {...getInputProps()} accept="image/*" />

      {selectFileUrlState ? (
        <img src={selectFileUrlState} alt="point image" />
      ) : isDragActive ? (
        <p>
          Solte
          <FiUpload />
        </p>
      ) : (
        <p>
          Arrastes a imagem
          <FiUpload />
        </p>
      )}

    </S.DropzoneContainer>
  );
};

export default Dropzone;
