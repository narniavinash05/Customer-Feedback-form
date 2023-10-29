
import { useNavigate } from 'react-router-dom';

function PushToHome() {

    const navigate = useNavigate();

    const handlePush = () => {
      navigate('/');  };

    return(
        <button onClick={handlePush} className=" mr-3 float-right bg-blue-500 hover-bg-red-600 text-white px-4 py-2 rounded font-semibold">
        Home
      </button>
    )
}
export default PushToHome;