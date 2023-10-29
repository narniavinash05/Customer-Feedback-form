import Spinner from './Spinner';

function DisplayFeedback({ feedback, isLoading }) {
  if (isLoading) return <Spinner />
  return <RenderTable feedback={feedback} />;
}

export default DisplayFeedback;

function RenderTable({ feedback }) {
  return (
    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8  mb-5">
      <h1 className="font-semibold text-xl mb-5">Your Past Feedbacks.</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="border border-black  whitespace-nowrap py-4 pl-4 pr-3 text-sm  text-gray-500">
              ID
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
                {feedback.dateTime.slice(0, 10)}
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
  );
}
