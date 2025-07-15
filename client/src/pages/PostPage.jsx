import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlog } from '../context/blogContext';
import Loader from '../components/Loader';
import Message from '../components/Message';

const PostPage = () => {
  const { id } = useParams();
  const { state, getPostById } = useBlog();
  const { post, loading, error } = state;

  useEffect(() => {
    getPostById(id);
  }, [id, getPostById]);

  return (
    <div className="max-w-4xl mx-auto">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <article className="bg-white rounded-lg shadow-md p-8">
          {post.featuredImage && (
            <div className="mb-8">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-purple-600 font-semibold">
              {post.category?.name}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center mr-3">
              <span className="text-purple-600 font-semibold">
                {post.author?.name.charAt(0)}
              </span>
            </div>
            <span className="text-gray-600">{post.author?.name}</span>
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      )}
    </div>
  );
};

export default PostPage;