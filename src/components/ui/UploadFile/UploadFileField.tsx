import { ChangeEvent, DragEvent, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface UploadFileProps {
  onFileSelect: (file: string | null) => void;
  id: string;
  defaultValue?: string | null;
}

function convertToBase64(file: File | null): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("File is null."));
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const result = fileReader.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("Unable to convert file to base64."));
      }
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

const UploadFileField = ({
  onFileSelect,
  id,
  defaultValue = null,
}: UploadFileProps) => {
  const [selectedFileBase64, setSelectedFileBase64] = useState<string | null>(
    defaultValue
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    const fileBase64 = await convertToBase64(file);
    setSelectedFile(file);
    setSelectedFileBase64(fileBase64);
    onFileSelect(fileBase64);
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
    const fileBase64 = await convertToBase64(file);
    setSelectedFile(file);
    setSelectedFileBase64(fileBase64);
    onFileSelect(fileBase64);
  };

  return (
    <div
      className={`flex items-center rounded-md ${
        dragging ? "border-blue-500 bg-blue-100" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label
        htmlFor={`file-upload-${id}`}
        className={`flex items-center justify-center flex-col px-4 py-2 bg-admin-page text-gray-700 rounded cursor-pointer border-2 border-dashed  ${
          dragging ? "border-blue-500" : "border-gray-400"
        }`}
      >
        {/* {dragging ? "Drop File" : "Select File"} */}
        <AiOutlineCloudUpload className="w-20 h-20 mt-5" />
        <p className="mb-5">Drag and drop or browse to choose a file</p>
      </label>
      <input
        id={`file-upload-${id}`}
        type="file"
        className="hidden"
        accept=".jpeg, .png, .jpg"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default UploadFileField;
