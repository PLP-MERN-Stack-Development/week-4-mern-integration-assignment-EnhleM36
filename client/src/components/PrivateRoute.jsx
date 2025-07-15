import { Navigate } from 'react-router-dom';
import { useBlog } from '../context/blogContext';

const PrivateRoute = ({ children }) => {
  const { state } = useBlog();
  const { userInfo } = state;

  return userInfo ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;