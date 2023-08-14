/**
 * TODO: handle error
 * TODO: styling
 * TODO: responsive design
 * TODO: loading spinner
 * TODO: successfully message
 */

import React, { useState } from "react";
import { CgMail } from "react-icons/cg";
import { API_URL } from "../../api/config";
import LoadingButton from "../../components/ui/LoadingButton";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function hasError() {
    return errorMessage !== "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    const response = await fetch(`${API_URL}/users/forgot-password`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonData = await response.json();

    setIsLoading(false);

    if (response.ok) {
      setSuccessMessage(jsonData.message);
    }
    if (!response.ok) {
      setErrorMessage(jsonData.message);
    }
  }

  return (
    <>
      {successMessage === "" && (
        <div className="w-[300px] sm:w-[400px] mx-auto mt-10">
          <h2 className="text-2xl text-wording font-medium mb-4">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className={`block mb-2 ${hasError() ? "text-red-500" : ""}`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`border rounded px-3 py-2 w-full outline-none ${
                  hasError() ? "border-red-500" : "border-gray-300"
                }`}
              />
              <p className={`mt-2 ${hasError() ? "text-red-500" : ""}`}>
                {errorMessage !== "" ? errorMessage : ""}
              </p>
            </div>
            {!isLoading ? (
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Send password reset email
              </button>
            ) : (
              <LoadingButton width="w-full" />
            )}
          </form>
        </div>
      )}

      {successMessage !== "" && (
        <div className="flex justify-center items-center flex-col mt-5">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-5">
            <CgMail className="w-14 h-14 text-gray-400" />
          </div>
          <p className="text-gray-700 text-center">{successMessage}</p>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordPage;
