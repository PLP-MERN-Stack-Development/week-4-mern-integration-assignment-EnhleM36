import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/blogContext';
import Loader from '../components/Loader';
import Message from '../components/Message';

const PostEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, getPostById, updatePost } = useBlog();
  const { post, loading, error } = state;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (!post._id || post._id !== id) {
      getPostById(id);
    } else {
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category._id);
      setExcerpt(post.excerpt);
      setIsPublished(post.isPublished);
    }
  }, [id, post, getPostById]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedPost = {
      _id: id,
      title,
      content,
      category,
      excerpt,
      isPublished,
    };
    const result = await updatePost(updatedPost);
    if (result) {
      navigate('/admin/postlist');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Post</h1>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <form onSubmit={submitHandler} className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="10"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="excerpt" className="block text-gray-700 font-medium mb-2">
              Excerpt (Optional)
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="form-checkbox h-5 w-5 text-purple-600"
              />
              <span className="ml-2 text-gray-700">Publish</span>
            </label>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/postlist')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Update Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PostEditPage;