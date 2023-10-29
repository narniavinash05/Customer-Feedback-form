import Cookies from 'js-cookie';

function NavBar (){

    const username = Cookies.get('user_name');
    const role = Cookies.get('role');

    if (username) {
        return (
          <div className=" p-0 rounded-md ">
            <p className="text-blue-600 text-sm">
              Current Logged in User : <span className="font-semibold">{username}</span> &nbsp;&nbsp;Role:  <span className="font-semibold">{role}</span>
            </p>
          </div>
        );
      } else {
        return null;
      }
    }

export default NavBar;