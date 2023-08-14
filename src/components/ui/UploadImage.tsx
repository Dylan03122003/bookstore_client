import { ChangeEvent, DragEvent, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BOOK_IMG_URL, IMAGE_URL } from "../../api/config";

type UploadImageProps = {
  onChange: (file: File) => void;
  defaultImage?: string;
  imageType: "user" | "book";
  backgroundColor?: string;
  useFor?: "add-update-book" | "update-me";
};

const UploadImage = ({
  onChange,
  defaultImage,
  imageType,
  backgroundColor = "bg-white",
  useFor,
}: UploadImageProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function getDefaultImageURL() {
    if (imageType === "user") {
      return `${IMAGE_URL}/img/users/${defaultImage}`;
    }
    if (imageType === "book") {
      return `${BOOK_IMG_URL}/${defaultImage}`;
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      onChange(event.target.files[0]);
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0] || null;
    setSelectedFile(file);
    onChange(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div
      className={`flex items-center justify-center rounded-md ${
        dragging ? "border-blue-500 bg-blue-100" : ""
      } ${
        useFor === "add-update-book"
          ? "w-72 md:w-80 lg:w-[660px]"
          : "w-72 sm:w-80"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label
        htmlFor={`file-upload`}
        className={`flex items-center justify-center flex-col px-4 py-2 ${backgroundColor} text-gray-700 rounded cursor-pointer border-2 border-dashed w-full  ${
          dragging ? "border-blue-500" : "border-gray-400"
        }`}
      >
        {/* {dragging ? "Drop File" : "Select File"} */}
        <img
          className="w-32 rounded-md"
          src={
            defaultImage && !selectedFile
              ? `${getDefaultImageURL()}`
              : `${previewUrl}`
          }
          alt=""
        />
        <AiOutlineCloudUpload className="w-20 h-20 mt-5" />
        <p className="mb-5 text-center">
          Drag and drop or browse to choose a file
        </p>
      </label>
      <input
        id={`file-upload`}
        type="file"
        className="hidden"
        accept=".jpeg, .png, .jpg"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadImage;
