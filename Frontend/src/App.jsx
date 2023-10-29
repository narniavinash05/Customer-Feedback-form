import AdminView from "./pages/AdminView";
import UserView from "./pages/UserView";
import LoginPage from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import Cookies from 'js-cookie';
import SignupPage from "./pages/Signup";
import { useState } from "react";
import { View } from "./pages/View";

function ProtectedRoute({ element }) {
  const jwtToken = Cookies.get('jwt_token');

  return jwtToken ? element : <Navigate to="/login" />;
}

function App() {

  const cRole = Cookies.get('role');

  const [role, setRole] = useState(cRole);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/"  exact
            element={<View />}
            />
          <Route path="/user"  element={<ProtectedRoute element={<UserView />} />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminView />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
