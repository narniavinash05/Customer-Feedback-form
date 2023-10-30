import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import HomePage from "./HomePage";

function LoginPage() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add state for error message



  const handleLogin = async (e) => {

    e.preventDefault();
    setIsLoading(true);

    const authData = {
      userName: userName,
      password: password,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const config = {
      method: "post",
      url: "http://localhost:8080/api/feedback/login",
      data: authData,
      withCredentials: true,
      headers: headers,
    };

    try {
      const authResponse = await axios(config);
      if (authResponse.status === 200) {
        const data = authResponse.data;
        Cookies.set("jwt_token", data.jwtToken);
        Cookies.set("user_name", data.userName);
        Cookies.set("role", data.role);
        navigate("/");
        setIsLoading(false);
      } else {
        setErrorMessage("Invalid credentials."); 
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage("Invalid credentials."); 
      console.error("error in token fetch: ", error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-evenly bg-gradient-to-r from-purple-200 to-cyan-200">
       <div>
        <HomePage />
       </div>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
          <Link to="/signup" className=" text-blue-500  font-normal">
          Create a new account
        </Link>
        </div>
        <button
        onClick={handleLogin}
        className={`bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold p-2 mt-4 ${
          isLoading ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >Login
        </button>
      </div>
      {isLoading?<Spinner />:<></>}
    </div>
  );
}

export default LoginPage;