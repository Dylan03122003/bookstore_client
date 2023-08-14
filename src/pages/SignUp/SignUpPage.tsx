/**
 * TODO: handle error
 * TODO: styling
 * TODO: responsive design
 * TODO: loading spinner
 * TODO: sign up successfully message
 */

import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { RxLockClosed } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api/config";
import { User } from "../../context/Auth/AuthType";
import { useAuth } from "../../hooks/useAuth";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUpPage = () => {
  const { dispatch } = useAuth();
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function hasError(value: string) {
    return !value && submitted;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.passwordConfirm
    ) {
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setErrorMessage("Passwords are not the same");
      return;
    }

    if (formData.password.length <= 7) {
      setErrorMessage("Password length must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    const response = await fetch(`${API_URL}/users/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const jsonData = await response.json();

    setIsLoading(false);

    if (response.ok) {
      const user: User = {
        userID: jsonData.data.user._id,
        name: formData.name,
        email: formData.email,
        token: jsonData.token,
        role: jsonData.data.user.role,
        photo: jsonData.data.user.photo,
        address: jsonData.data.user.address,
        phone: jsonData.data.user.phone,
      };

      dispatch({
        type: "LOGIN",
        payload: user,
      });

      navigate("/");
    }

    if (!response.ok) {
      // setErrorMessage(jsonData.message);
      if (jsonData.message === "Disallow duplicate values") {
        setErrorMessage("Email already in use");
      }
    }

    setFormData({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
    setSubmitted(false);
  };
  return (
    <div className="w-[300px] sm:w-[400px] mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
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
              hasError(formData.name) ? "text-red-500" : "text-[#5F6B7B]"
            }`}
          >
            Name
          </label>
          <div
            className={`flex items-center border  rounded-xl px-3 py-2 gap-2 ${
              hasError(formData.name) ? "border-red-400" : "border-gray-300"
            }`}
          >
            <BsPerson className="text-gray-300 text-3xl" />
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Smith"
              value={formData.name}
              onChange={handleInputChange}
              className="outline-none w-full"
            />
          </div>
          {hasError(formData.name) && (
            <p className="mt-2 text-red-500">Name can't be empty!</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className={`block mb-2 ${
              hasError(formData.email) ? "text-red-500" : "text-[#5F6B7B]"
            }`}
          >
            Email
          </label>

          <div
            className={`flex items-center border  rounded-xl px-3 py-2 gap-2 ${
              hasError(formData.email) ? "border-red-400" : "border-gray-300"
            }`}
          >
            <BsPerson className="text-gray-300 text-3xl" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Username@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              className="outline-none w-full"
            />
          </div>
          {hasError(formData.email) && (
            <p className="mt-2 text-red-500">Email can't be empty!</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className={`block mb-2 ${
              hasError(formData.password) ? "text-red-500" : "text-[#5F6B7B]"
            }`}
          >
            Password
          </label>

          <div
            className={`flex items-center border rounded-xl px-3 py-2 gap-2 ${
              hasError(formData.password) ? "border-red-400" : "border-gray-300"
            }`}
          >
            <RxLockClosed className="text-gray-300 text-3xl" />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="outline-none w-full"
            />
          </div>
          {hasError(formData.password) && (
            <p className="mt-2 text-red-500">Password can't be empty!</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="passwordConfirm"
            className={`block mb-2 ${
              hasError(formData.passwordConfirm)
                ? "text-red-500"
                : "text-[#5F6B7B]"
            }`}
          >
            Confirm Password
          </label>
          <div
            className={`flex items-center border rounded-xl px-3 py-2 gap-2 ${
              hasError(formData.passwordConfirm)
                ? "border-red-400"
                : "border-gray-300"
            }`}
          >
            <RxLockClosed className="text-gray-300 text-3xl" />
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleInputChange}
              className="outline-none w-full"
            />
          </div>
          {hasError(formData.passwordConfirm) && (
            <p className="mt-2 text-red-500">
              Passowrd confirm can't be empty!
            </p>
          )}
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-5"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
