import { Navigate } from 'react-router-dom';
import { useBlog } from '../context/blogContext';

const AdminRoute = ({ children }) => {
  const { state } = useBlog();
  const { userInfo } = state;

  return userInfo && userInfo.role === 'admin' ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;