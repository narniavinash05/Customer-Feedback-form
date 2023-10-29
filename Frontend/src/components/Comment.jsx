// display textarea for user comments

export default function Comment({
  comment,
  setComment,
  submitFeedback,
  isLoading,
}) {
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div>
      <textarea
        id="feedback"
        name="feedback"
        value={comment}
        onChange={handleCommentChange}
        className="w-full h-32 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Please enter your feedback here..."
      />
      <br />
      <button
        onClick={submitFeedback}
        className={`bg-green-500 hover:bg-green-600 text-white rounded font-semibold p-2 mt-4 ${
          isLoading ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        Submit Feedback →
      </button>
    </div>
  );
}
