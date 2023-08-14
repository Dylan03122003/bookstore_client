/**
 * TODO: handle error
 * TODO: styling
 * TODO: responsive design
 * TODO: loading spinner
 * TODO: login successfully message
 */
import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { RxLockClosed } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../api/config";
import { User } from "../../context/Auth/AuthType";
import { useAuth } from "../../hooks/useAuth";

interface LoginData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    const response = await fetch(`${API_URL}/users/log-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const jsonData = await response.json();
    setIsLoading(false);

    if (response.ok) {
      const user: User = {
        userID: jsonData.data.user._id,
        name: jsonData.data.user.name,
        photo: jsonData.data.user.photo,
        email: loginData.email,
        token: jsonData.token,
        role: jsonData.data.user.role,
        address: jsonData.data.user.address,
        phone: jsonData.data.user.phone,
      };
      dispatch({ type: "LOGIN", payload: user });

      navigate("/");
    }
    if (!response.ok) {
      setErrorMessage(jsonData.message);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-[#080808]">
        You must Sign In to join
      </h2>
      <p className="text-center text-gray-400">
        We're A Team That Guides Each Other
      </p>
      {errorMessage && (
        <p className="mt-5 text-red-500 w-[300px] sm:w-[400px] mx-auto">
          {errorMessage}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="mt-5 w-[300px] sm:w-[400px] mx-auto"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-[#5F6B7B]">
            Email
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 gap-2">
            <BsPerson className="text-gray-300 text-3xl" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Username@gmail.com"
              value={loginData.email}
              onChange={handleInputChange}
              className="outline-none w-full"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-[#5F6B7B]">
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 gap-2">
            <RxLockClosed className="text-gray-300 text-3xl" />
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              className="outline-none w-full"
              placeholder="Password"
            />
          </div>
        </div>
        <Link className="flex justify-end my-4" to="/forgot-password">
          <span className="text-blue-600">Forgot Password?</span>
        </Link>
        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-login hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>

      <div className="flex items-center justify-center gap-2 mt-14">
        <p className="text-gray-500">Don't have account?</p>
        <Link to="/sign-up" className="text-[#080808] font-medium">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
