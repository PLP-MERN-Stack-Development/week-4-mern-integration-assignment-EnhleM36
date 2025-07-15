import { useEffect } from 'react';
import { useBlog } from '../context/blogContext';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomePage = () => {
  const { state, getPosts } = useBlog();
  const { posts, loading, error } = state;

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Latest Posts</h1>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;