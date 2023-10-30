import { useState, useEffect } from "react";
import axiosInstance from "../components/api";
import Spinner from "../components/Spinner";
import Logout from "./Logout";
import NavBar from "../components/NavBar";


function AdminView() {

  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);

  // get my previous feedbacks from backend

  useEffect(() => {
    axiosInstance.get('/api/feedback/admin')
      .then(response => {
        if (response.status === 403) {
          setIsAuthorized(false);
        } else {
          setFeedback(response.data);
          setIsAuthorized(true);
        }
        setIsLoading(false);

      })
      .catch(error => {
        console.error(error);
        setIsAuthorized(false);
        setIsLoading(false);
      });
  }, []);


  return (
    !isLoading ? (
      !isAuthorized ? <h1 className="text-5xl">You are not authorized to view this page.</h1> : <RenderTable feedback={feedback} />
    ) : <Spinner />
  );
  


}

export default AdminView;

function RenderTable({ feedback }) {

  return (
    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 ">
     <NavBar />
     <Logout />

      <h1 className="font-semibold text-4xl mt-5 mb-5">
        Welcome - Administrator! 
      </h1>
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8  mb-5">
        <h1 className="font-semibold text-xl mb-5">
          List of all feedbacks received
        </h1>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border border-black  whitespace-nowrap py-4 pl-4 pr-3 text-sm  text-gray-500">
                ID
              </th>
              <th className="border border-black  whitespace-nowrap py-4 pl-4 pr-3 text-sm  text-gray-500">
                User
              </th>
              <th className="border border-black  whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                Date
              </th>
              <th className="border border-black  whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                Rating
              </th>
              <th className="border border-black whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                User Comment
              </th>
            </tr>
          </thead>
          <tbody className="bg-white shadow-lg">
            {feedback.map((feedback) => (
              <tr key={feedback.id}>
                <td className="border border-black  whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                  {feedback.id}
                </td>
                <td className="border border-black  whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {feedback.username}
                </td>
                <td className="border border-black  whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {feedback.dateTime}
                </td>
                <td className="border border-black  whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {feedback.rating}
                </td>
                <td className="border border-black whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {feedback.feedbackText}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}