import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PostListPage from './pages/PostListPage';
import PostEditPage from './pages/PostEditPage';
import CategoryListPage from './pages/CategoryListPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/posts/search/:keyword" element={<PostListPage />} />
          <Route path="/posts/page/:pageNumber" element={<PostListPage />} />
          <Route path="/categories" element={<CategoryListPage />} />
          
          {/* Private Routes */}
          <Route path="" element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="" element={<AdminRoute />}>
            <Route path="/admin/postlist" element={<PostListPage admin />} />
            <Route path="/admin/post/:id/edit" element={<PostEditPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;