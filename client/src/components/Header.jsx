import { Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/blogContext';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';

const Header = () => {
  const { state } = useBlog();
  const { userInfo } = state;
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="text-2xl font-bold mb-4 md:mb-0">
            MERN Blog
          </Link>
          
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <SearchBox />
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link to="/" className="hover:text-purple-200 transition">
              Home
            </Link>
            <Link to="/posts" className="hover:text-purple-200 transition">
              Posts
            </Link>
            <Link to="/categories" className="hover:text-purple-200 transition">
              Categories
            </Link>
            
            {userInfo ? (
              <div className="flex items-center space-x-4">
                {userInfo.role === 'admin' && (
                  <Link to="/admin/postlist" className="hover:text-purple-200 transition">
                    Admin
                  </Link>
                )}
                <Link to="/profile" className="hover:text-purple-200 transition">
                  Profile
                </Link>
                <button
                  onClick={logoutHandler}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="hover:text-purple-200 transition">
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;