import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api/config";
import { Button, EmailField, TextField } from "../../components";
import UploadImage from "../../components/ui/UploadImage";
import { User, UserRole } from "../../context/Auth/AuthType";
import { useAuth } from "../../hooks/useAuth";

const UpdateMeForm = () => {
  const { user, dispatch } = useAuth();
  const [updatedUser, setUpdatedUser] = useState<User | null>(user);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function isDisabledButton() {
    return updatedUser?.name === "" || updatedUser?.email === "";
  }

  async function handleUpdate() {
    setIsLoading(true);

    try {
      if (user?.token) {
        const formData = new FormData();
        if (selectedFile) {
          formData.append("photo", selectedFile);
        }
        formData.append("name", updatedUser?.name || "");
        formData.append("email", updatedUser?.email || "");

        const response = await axios.patch(
          `${API_URL}/users/update-me`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (updatedUser?.photo) {
          updatedUser.photo = response.data.user.photo;
        }

        dispatch({ type: "UPDATE_ME", updatedUser });
        navigate(-1);
      }
    } catch (error) {
      console.log("THERE IS AN ERROR: ", error);
    }

    setIsLoading(false);
  }

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="text-xl font-semibold text-wording mt-5 sm:mt-0">
          Update Profile
        </h2>
        <TextField
          label="Enter name"
          placeholder="Your name"
          required={true}
          backgroundColor={`${
            user?.role === UserRole.Admin ? "bg-admin-page" : "bg-white"
          }`}
          value={updatedUser ? updatedUser.name : ""}
          onChange={(e) => {
            if (updatedUser) {
              setUpdatedUser({ ...updatedUser, name: e.target.value });
            }
          }}
        />
        <EmailField
          label="Enter email"
          value={updatedUser ? updatedUser.email : ""}
          placeholder="Your email address"
          required={true}
          backgroundColor={`${
            user?.role === UserRole.Admin ? "bg-admin-page" : "bg-white"
          }`}
          onChange={(e) => {
            if (updatedUser) {
              setUpdatedUser({ ...updatedUser, email: e.target.value });
            }
          }}
        />

        <UploadImage
          imageType="user"
          defaultImage={user?.photo}
          onChange={(file) => {
            setSelectedFile(file);
          }}
          backgroundColor={`${
            user?.role === UserRole.Admin ? "bg-admin-page" : "bg-white"
          }`}
        />
      </div>

      <div className="flex justify-end items-end gap-4 w-80 mt-5 mb-20 mx-auto">
        <Button
          backgroundColor="bg-white"
          textColor="text-gray-600"
          borderOptions="border border-solid border-gray-300"
          onClick={() => {
            navigate("..");
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading || isDisabledButton()}
          onClick={handleUpdate}
          backgroundColor="bg-blue-400"
          textColor="text-white"
        >
          {isLoading ? "Loading" : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default UpdateMeForm;
