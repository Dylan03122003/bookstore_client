import axios from "axios";
import { useState } from "react";

import { API_URL } from "../../api/config";
import LoadingButton from "../../components/ui/LoadingButton";

import { useNavigate } from "react-router-dom";
import UploadImage from "../../components/ui/UploadImage";
import AdminPageContainer from "../../components/wrapper/AdminPageContainer";
import { useAuth } from "../../hooks/useAuth";
import { useBook } from "../../hooks/useBook";
import {
  Button,
  NumberField,
  PriceUSField,
  SelectField,
  TextArea,
  TextField,
} from "./../../components";

export interface BookFormValues {
  title: string;
  author: string;
  description: string;
  price: number;
  categories: string[];
  quantity: number;
  image: string;
}

const defaultBook: BookFormValues = {
  author: "",
  categories: [],
  description: "",
  image: "",
  price: 0,
  quantity: 0,
  title: "",
};

const AddBookPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<BookFormValues>(defaultBook);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const { dispatch } = useBook();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  function isDisabledBtn() {
    return (
      formValues.author === "" ||
      formValues.categories.length === 0 ||
      formValues.description === "" ||
      imgFile === null ||
      formValues.price <= 0 ||
      formValues.quantity <= 0 ||
      formValues.title === ""
    );
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  async function handleSubmit() {
    try {
      if (user?.token) {
        setIsLoading(true);

        const formData = new FormData();
        if (imgFile) {
          formData.append("image", imgFile);
        }
        formData.append("author", formValues.author);
        const categoriesString = formValues.categories.join(", "); // Convert array to a single string
        formData.append("categories", categoriesString);
        formData.append("description", formValues.description);
        formData.append("price", formValues.price + "");
        formData.append("quantity", formValues.quantity + "");
        formData.append("title", formValues.title);

        const response = await axios.post(`${API_URL}/books`, formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch({ type: "ADD", newBook: response.data.book });
        navigate("/books");
      }
    } catch (error) {
      console.log("MY ERROR: ", error);
    }
    setIsLoading(false);
  }
  return (
    <AdminPageContainer>
      <div className="w-full lg:w-[660px] mx-auto flex items-center justify-center sm:justify-start my-5">
        <h2 className="text-xl text-wording font-semibold">Add New Book</h2>
      </div>

      <div className="mb-5 w-fit mx-auto p-5 rounded-md ">
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <TextField
              label="Enter title"
              placeholder="Harry Potter"
              required={true}
              name="title"
              onChange={(e) => handleChange(e)}
            />

            <TextField
              label="Enter author"
              placeholder="Mark Manson"
              name="author"
              required={true}
              onChange={(e) => handleChange(e)}
            />

            <TextArea
              className=""
              name="description"
              label="Enter your description"
              onChange={(e) => handleChange(e)}
              placeholder="This is book description"
              required={true}
            />

            <SelectField
              isRequired
              label="Select category"
              onChange={(tags) => {
                setFormValues((prevValues) => {
                  return { ...prevValues, categories: tags };
                });
              }}
            />

            <PriceUSField
              label="Enter the price"
              placeholder="10.5"
              name="price"
              required={true}
              onChange={(e) => handleChange(e)}
            />

            <NumberField
              label="Enter quantity"
              placeholder="1"
              name="quantity"
              required={true}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <UploadImage
            imageType="book"
            backgroundColor="bg-admin-page"
            useFor="add-update-book"
            onChange={(file) => {
              setImgFile(file);
            }}
          />
        </div>
      </div>

      <div className="w-full lg:w-[700px] mx-auto flex items-center justify-center sm:justify-end">
        {!isLoading ? (
          <Button
            disabled={isLoading || isDisabledBtn()}
            backgroundColor="bg-blue-500"
            textColor="text-white"
            onClick={handleSubmit}
          >
            {isLoading ? "Loading" : "Submit"}
          </Button>
        ) : (
          <LoadingButton />
        )}
      </div>
    </AdminPageContainer>
  );
};

export default AddBookPage;
