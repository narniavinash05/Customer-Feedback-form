import Spinner from "../components/Spinner";
import AdminView from "./AdminView";
import UserView from "./UserView";
import Cookies from 'js-cookie';


export function View ()  {

    const role = Cookies.get('role');

    if(role === 'USER') return <UserView />
    else if(role === 'ADMIN') return <AdminView />
    else return <Spinner />
}