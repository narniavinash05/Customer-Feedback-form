import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import HomePage from "./HomePage";

function SignupPage() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userData = {
      username: userName,
      password: password,
      role : 'USER'
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/feedback/signup",
        userData
      );

      if (response.status === 200) {
        setSuccessMessage("User added to Database");
        setErrorMessage(""); 
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Failed. User already exists.");
      console.error("Error: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-evenly bg-gray-100">
         <div>
        <HomePage />
       </div>
      <div className="bg-white p-8 rounded shadow-md w-96">
     
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        {successMessage && (
          <p className="text-green-500 text-sm mb-2">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-5"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
                 
          <Link to="/login" className=" text-blue-500  font-normal">
          Have an account ? Sign in
        </Link>
        </div>
        <button
          onClick={handleSignup}
          className={`bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold p-2 mt-4 ${
            isLoading ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          Sign Up
        </button>
        
      </div>
      {isLoading ? <Spinner /> : <></>}
      
    </div>
  );
}

export default SignupPage;