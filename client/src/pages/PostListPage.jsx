import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/blogContext';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const PostListPage = ({ admin = false }) => {
  const { keyword, pageNumber } = useParams();
  const navigate = useNavigate();
  const { state, getPosts } = useBlog();
  const { posts, loading, error, page, pages } = state;

  useEffect(() => {
    getPosts(keyword || '', pageNumber || '');
  }, [keyword, pageNumber, getPosts]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      // Delete post logic
    }
  };

  return (
    <div>
      {admin && (
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Posts</h1>
          <button
            onClick={() => navigate('/admin/post/create')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
          >
            Create Post
          </button>
        </div>
      )}
      
      {!admin && (
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          {keyword ? `Search: ${keyword}` : 'All Posts'}
        </h1>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                admin={admin}
                onDelete={deleteHandler}
              />
            ))}
          </div>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
            isAdmin={admin}
          />
        </>
      )}
    </div>
  );
};

export default PostListPage;