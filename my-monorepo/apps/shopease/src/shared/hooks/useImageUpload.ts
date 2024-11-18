import imageCompression from "browser-image-compression";
import { useCallback } from "react";

type ImageUploadProps = {
  setImageList: React.Dispatch<React.SetStateAction<File[]>>;
  setImageNameList: React.Dispatch<React.SetStateAction<string[]>>;
};

export const useImageUpload = ({
  setImageList,
  setImageNameList,
}: ImageUploadProps) => {
  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const files = event.target.files;
      if (files && files.length > 0) {
        const compressedFiles: File[] = [];
        const fileNames: string[] = [];

        // Compression options
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
          useWebWorker: true,
          fileType: "image/webp",
        };

        for (const file of files) {
          try {
            const compressedFile = await imageCompression(file, options);

            // 파일 이름에 .webp 확장자 추가
            const webpFile = new File(
              [compressedFile],
              `${file.name.split(".")[0]}.webp`,
              {
                type: "image/webp",
              },
            );

            compressedFiles.push(webpFile);
            fileNames.push(webpFile.name);
          } catch (error) {
            console.error("Image compression error:", error);
          }
        }
        setImageList((prev) => [...prev, ...compressedFiles]);
        setImageNameList((prev) => [...prev, ...fileNames]);
      } else {
        setImageList([]);
        setImageNameList([]);
      }
    },
    [setImageList, setImageNameList],
  );

  return { handleImageUpload };
};
