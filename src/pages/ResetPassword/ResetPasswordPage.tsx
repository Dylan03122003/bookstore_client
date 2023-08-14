/**
 * TODO: handle error
 * TODO: styling
 * TODO: responsive design
 * TODO: loading spinner
 * TODO: successfully message
 */

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../api/config";
import { useAuth } from "../../hooks/useAuth";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useParams();
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password === "" || passwordConfirm === "") {
      setErrorMessage("Passwords cannot be empty");
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (password.length < 8 || passwordConfirm.length < 8) {
      setErrorMessage("Passwords lenght must greater than 7");
      return;
    }

    const response = await fetch(`${API_URL}/users/reset-password/${token}`, {
      method: "PATCH",
      body: JSON.stringify({
        password,
        passwordConfirm,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonData = await response.json();

    if (response.ok) {
      const { token, email, name, role, _id, photo, address, phone } = jsonData;
      dispatch({
        type: "LOGIN",
        payload: {
          token,
          email,
          name,
          role,
          userID: _id,
          photo,
          address,
          phone,
        },
      });
      navigate("/");
    }

    if (!response.ok) {
      setErrorMessage(jsonData.message);
    }
  }

  if (!token) {
    return (
      <div>
        <h2>Something went wrong! Token does not exist</h2>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-xs mx-auto mt-5">
        <h2 className="text-2xl font-semibold text-wording mb-6">
          Reset Password
        </h2>
        {errorMessage !== "" && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-[#5F6B7B] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none "
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="passwordConfirm"
              className="block text-[#5F6B7B] mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none "
              placeholder="Confirm your password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordPage;
