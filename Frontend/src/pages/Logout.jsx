
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Logout() {

    const navigate = useNavigate();

    const handleLogout = () => {
      Cookies.remove('jwt_token');
      Cookies.remove('user_name');
      Cookies.remove('role');

      navigate('/login');  };

    return(
        <button onClick={handleLogout} className="float-right bg-red-500 hover-bg-red-600 text-white px-4 py-2 rounded font-semibold">
        Logout
      </button>
    )
}
export default Logout;