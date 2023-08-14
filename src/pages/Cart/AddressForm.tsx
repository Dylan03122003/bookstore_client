import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../api/config";
import { Button, TextField } from "../../components";
import LoadingButton from "../../components/ui/LoadingButton";
import { useAuth } from "../../hooks/useAuth";

type AddressFormProps = {
  onCancel?: () => void;
};

const AddressForm = ({ onCancel }: AddressFormProps) => {
  const { user, dispatch } = useAuth();
  const [address, setAddress] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  function isDisabledButton() {
    return !address || !phone;
  }

  async function handleNext() {
    setIsLoading(true);

    try {
      if (user?.token) {
        const formData = new FormData();

        formData.append("address", address || "");
        formData.append("phone", phone || "");

        await axios.patch(`${API_URL}/users/update-me`, formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        dispatch({
          type: "UPDATE_ME",
          updatedUser: { ...user, address, phone },
        });
      }
    } catch (error) {
      console.log("THERE IS AN ERROR: ", error);
    }

    setIsLoading(false);
  }

  return (
    <div className="w-72 sm:w-80 mx-auto mt-10">
      <h2 className="text-xl text-wording font-medium mb-5 text-center">
        You have not filled your address!
      </h2>
      <TextField
        label="Enter address"
        placeholder="your address"
        onChange={(e) => setAddress(e.target.value)}
        backgroundColor="bg-white"
      />
      <div className="mb-5"></div>
      <TextField
        forPhone={true}
        label="Enter phone number"
        placeholder="your phone number"
        onChange={(e) => setPhone(e.target.value)}
        backgroundColor="bg-white"
      />
      <div className="flex items-center justify-end mt-5 gap-4">
        <Button
          onClick={() => {
            onCancel && onCancel();
          }}
          borderOptions="border border-solid border-gray-300"
        >
          Cancel
        </Button>
        {!isLoading ? (
          <Button
            disabled={isDisabledButton()}
            onClick={() => {
              handleNext();
            }}
            backgroundColor="bg-blue-500"
            textColor="text-white"
          >
            Next
          </Button>
        ) : (
          <LoadingButton />
        )}
      </div>
    </div>
  );
};

export default AddressForm;
