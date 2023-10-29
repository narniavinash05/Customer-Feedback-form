import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router DOM for navigation
import NavBar from "../components/NavBar";

function HomePage() {
  return (
    <div className="bg-gray-100 pt-5 flex flex-col justify-center items-center py-10">
      <h1 className="text-4xl font-semibold mb-4">Customer Feedback System</h1>
      <p className="text-lg text-center ">
        Welcome to our customer feedback system. We value your input to help
        improve our services.
      </p>
    </div>
  );
}

export default HomePage;