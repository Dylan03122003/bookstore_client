import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../api/config";
import {
  Button,
  NumberField,
  PriceUSField,
  SelectField,
  TextArea,
  TextField,
} from "../../components";
import UploadImage from "../../components/ui/UploadImage";
import AdminPageContainer from "../../components/wrapper/AdminPageContainer";
import { useAuth } from "../../hooks/useAuth";
import { useBook } from "../../hooks/useBook";
import { BookFormValues } from "../AddBook/AddBookPage";

const defaultBook: BookFormValues = {
  author: "",
  categories: [],
  description: "",
  image: "",
  price: 0,
  quantity: 0,
  title: "",
};

const UpdateBookPage = () => {
  const { bookID } = useParams();
  const { user } = useAuth();
  const { dispatch } = useBook();
  const navigate = useNavigate();
  const { getBookByID } = useBook();
  const updatedBook = getBookByID(bookID ? bookID : "");
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<BookFormValues>(
    updatedBook ? updatedBook : defaultBook
  );
  const [imgFile, setImgFile] = useState<File | null>(null);
  function isDisabledBtn() {
    return (
      formValues.author === "" ||
      formValues.categories.length === 0 ||
      formValues.description === "" ||
      formValues.image === "" ||
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

  async function handleUpdate() {
    setIsLoading(true);

    try {
      if (user?.token) {
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

        const response = await axios.patch(
          `${API_URL}/books/${bookID}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        dispatch({ type: "UPDATE", payload: response.data.book });
        navigate(-1);
      }
    } catch (error) {
      console.log("THERE IS AN ERROR: ", error);
    }

    setIsLoading(false);
  }

  return (
    <AdminPageContainer>
      <h2 className="text-center mb-10 text-lg text-wording font-medium">
        Update Book
      </h2>

      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <TextField
            label="Enter title"
            placeholder="Harry Potter"
            required={true}
            value={formValues.title}
            name="title"
            onChange={(e) => handleChange(e)}
          />

          <TextField
            label="Enter author"
            placeholder="Mark Manson"
            required={true}
            value={formValues.author}
            name="author"
            onChange={(e) => handleChange(e)}
          />

          <TextArea
            className=""
            label="Enter your description"
            value={formValues.description}
            name="description"
            onChange={(e) => handleChange(e)}
            placeholder="This is book description"
            required={true}
          />

          <SelectField
            isRequired
            label="Select category"
            defaultValue={formValues.categories}
            onChange={(tags) => {
              setFormValues((prevValues) => {
                return { ...prevValues, categories: tags };
              });
            }}
          />

          <PriceUSField
            label="Enter the price"
            placeholder="10.5"
            required={true}
            value={formValues.price}
            name="price"
            onChange={(e) => handleChange(e)}
          />

          <NumberField
            label="Enter quantity"
            placeholder="1"
            required={true}
            value={formValues.quantity}
            name="quantity"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <UploadImage
          imageType="book"
          onChange={(file) => setImgFile(file)}
          defaultImage={formValues.image}
          backgroundColor="bg-admin-page"
          useFor="add-update-book"
        />
      </div>

      <div className="flex justify-end items-end gap-4 w-[350px] lg:w-[650px] mt-5 mb-20 mx-auto">
        <button
          className="border border-solid border-gray-300 px-4 py-2 rounded-md text-gray-600"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <Button
          onClick={handleUpdate}
          disabled={isLoading || isDisabledBtn()}
          backgroundColor="bg-blue-500"
          textColor="text-white"
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </div>
    </AdminPageContainer>
  );
};

export default UpdateBookPage;
