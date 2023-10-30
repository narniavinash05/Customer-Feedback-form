import { useState, useEffect } from "react";
import DisplayFeedback from "../components/DisplayUserFeedback";
import Comment from "../components/Comment";
import Rating from "../components/Rating";
import axiosInstance from "../components/api";
import Logout from "./Logout";

import NavBar from "../components/NavBar";

function UserView() {

  //states
  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  // get my previous feedbacks from backend
  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = () => {
    axiosInstance.get('/api/feedback/self')
      .then(response => {
        if (response.status === 200) { 
          setFeedback(response.data);
          setIsLoading(false);
        } else {
          console.log("Failed to fetch feedback");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  // submit feedback to backend
  const submitFeedback = () => {
    setIsLoading(true);
  
    // Check if comment or rating is null or empty
    if (!comment || rating === null || rating === undefined) {
      setIsLoading(false);
      setErrorMessage('Missing data');
      setSuccessMessage();
    } else {
      const payload = {
        comment: comment,
        rating: rating.toString(),
      };
  
      axiosInstance
        .post('/api/feedback/', payload)
        .then((response) => {
          if (response.status === 200) {
            setComment('');
            setRating();
            getFeedback();
            setErrorMessage();
            setSuccessMessage("Your feedback was saved.");
          } else {
            console.log('Failed to submit feedback');
            setErrorMessage('Failed to submit feedback');
            setSuccessMessage();
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorMessage('Something went wrong. Please try later.');
          setSuccessMessage();
          console.error(error);
        });
    }
  };
  
  return (
    <>
      {/* submit my feedback */}
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 ">
       <NavBar />
        <Logout />
        <h1 className="font-semibold text-4xl mt-5 mb-5">
          Welcome to the Customer Feedback Platform.
        </h1>
        <h1 className=" text-xl mt-7 mb-2">Please provide a Rating &nbsp; [ {rating} out of 5 ].</h1>
        <Rating rating={rating} setRating={setRating} />
        <h1 className=" text-xl mt-7 mb-2">
          Please describe your experience in a few words...
        </h1>
        <Comment
          comment={comment}
          setComment={setComment}
          submitFeedback={submitFeedback}
          isLoading={isLoading}
        />
        {successMessage && (
          <p className="text-green-500 text-sm my-2">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm my-2">{errorMessage}</p>
        )}
      </div>


      {/* display my feedbacks */}
      <DisplayFeedback feedback={feedback} isLoading={isLoading} />
  
    </>
  );
}

export default UserView;