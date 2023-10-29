// display Rating option


export default function Rating({ rating, setRating }) {
    const buttons = [0, 1, 2, 3, 4, 5];
  
    return (
      <>
        <div className="flex flex-row justify-normal ">
          {buttons.map((value) => (
            <button
              key={value}
              onClick={() => setRating(value)}
              className={`p-3 px-10 border border-green shadow-md rounded ${
                value < rating ? "bg-green-400 text-white" : value === rating ? "bg-green-500 text-white" : "bg-gray-700 text-white"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </>
    );
  }
  