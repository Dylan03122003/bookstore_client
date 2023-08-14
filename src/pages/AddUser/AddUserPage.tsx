import { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { RxLockClosed } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api/config";
import SingleSelect from "../../components/ui/SingleSelect";
import AdminPageContainer from "../../components/wrapper/AdminPageContainer";

interface CreatedUser {
  name: string;
  email: string;
  role: string;
  password: string;
  passwordConfirm: string;
}

const AddUserPage = () => {
  const [createdUser, setCreatedUser] = useState<CreatedUser>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "user",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCreatedUser((prevCreatedUser) => ({
      ...prevCreatedUser,
      [name]: value,
    }));
  };

  function hasError(value: string) {
    return !value && submitted;
  }

  async function handleSubmit(event: React.FormEvent) {
    //
    event.preventDefault();
    setSubmitted(true);

    if (
      !createdUser.name ||
      !createdUser.email ||
      !createdUser.password ||
      !createdUser.passwordConfirm ||
      !createdUser.role
    ) {
      return;
    }

    if (createdUser.password !== createdUser.passwordConfirm) {
      setErrorMessage("Passwords are not the same");
      return;
    }

    if (createdUser.password.length <= 7) {
      setErrorMessage("Password length must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    const response = await fetch(`${API_URL}/users/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdUser),
    });

    const jsonData = await response.json();

    setIsLoading(false);

    if (response.ok) {
      setErrorMessage("");
      navigate("/users");
    }

    if (!response.ok) {
      // setErrorMessage(jsonData.message);
      if (jsonData.message === "Disallow duplicate values") {
        setErrorMessage("Email already in use");
      }
    }

    setCreatedUser({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      role: "user",
    });
    setSubmitted(false);
  }

  return (
    <AdminPageContainer>
      <div className="w-[300px] sm:w-[400px] mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">Create User</h2>
        <p className="mb-5 text-gray-400">
          Welcome to our community! Join us today and embark on a journey of
          endless possibilities
        </p>
        {errorMessage && <p className="mb-4 text-red-500 ">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <label
              htmlFor="name"
              className={`block mb-2  ${
                hasError(createdUser.name) ? "text-red-500" : "text-[#5F6B7B]"
              }`}
            >
              Name
            </label>
            <div
              className={`flex items-center border  rounded-xl px-3 py-2 gap-2 ${
                hasError(createdUser.name)
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
            >
              <BsPerson className="text-gray-300 text-3xl" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Smith"
                value={createdUser.name}
                onChange={handleInputChange}
                className="outline-none w-full bg-transparent"
              />
            </div>
            {hasError(createdUser.name) && (
              <p className="mt-2 text-red-500">Name can't be empty!</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block mb-2 ${
                hasError(createdUser.email) ? "text-red-500" : "text-[#5F6B7B]"
              }`}
            >
              Email
            </label>

            <div
              className={`flex items-center border  rounded-xl px-3 py-2 gap-2 ${
                hasError(createdUser.email)
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
            >
              <BsPerson className="text-gray-300 text-3xl" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Username@gmail.com"
                value={createdUser.email}
                onChange={handleInputChange}
                className="outline-none w-full bg-transparent"
              />
            </div>
            {hasError(createdUser.email) && (
              <p className="mt-2 text-red-500">Email can't be empty!</p>
            )}
          </div>

          <SingleSelect
            width="w-full"
            label="Select role"
            defaultChoices={["user", "shipper", "admin"]}
            marginB="mb-5"
            rounded="rounded-xl"
            defaultSelected="user"
            onChange={(tag) => {
              setCreatedUser((prevUser) => {
                return { ...prevUser, role: tag };
              });
            }}
          />

          <div className="mb-4">
            <label
              htmlFor="password"
              className={`block mb-2 ${
                hasError(createdUser.password)
                  ? "text-red-500"
                  : "text-[#5F6B7B]"
              }`}
            >
              Password
            </label>

            <div
              className={`flex items-center border rounded-xl px-3 py-2 gap-2 ${
                hasError(createdUser.password)
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
            >
              <RxLockClosed className="text-gray-300 text-3xl" />
              <input
                type="password"
                id="password"
                name="password"
                value={createdUser.password}
                onChange={handleInputChange}
                className="outline-none w-full bg-transparent"
              />
            </div>
            {hasError(createdUser.password) && (
              <p className="mt-2 text-red-500">Password can't be empty!</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="passwordConfirm"
              className={`block mb-2 ${
                hasError(createdUser.passwordConfirm)
                  ? "text-red-500"
                  : "text-[#5F6B7B]"
              }`}
            >
              Confirm Password
            </label>
            <div
              className={`flex items-center border rounded-xl px-3 py-2 gap-2 ${
                hasError(createdUser.passwordConfirm)
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
            >
              <RxLockClosed className="text-gray-300 text-3xl" />
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={createdUser.passwordConfirm}
                onChange={handleInputChange}
                className="outline-none w-full bg-transparent"
              />
            </div>
            {hasError(createdUser.passwordConfirm) && (
              <p className="mt-2 text-red-500">
                Passowrd confirm can't be empty!
              </p>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-5 sm:mb-0 mb-10"
          >
            {isLoading ? "Loading..." : "Save"}
          </button>
        </form>
      </div>
    </AdminPageContainer>
  );
};

export default AddUserPage;
