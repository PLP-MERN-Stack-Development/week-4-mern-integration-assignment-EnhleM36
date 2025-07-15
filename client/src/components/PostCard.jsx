import { Link } from 'react-router-dom';
import moment from 'moment';

const PostCard = ({ post, admin = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {post.featuredImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-purple-600 font-semibold">
            {post.category?.name}
          </span>
          <span className="text-sm text-gray-500">
            {moment(post.createdAt).format('MMM D, YYYY')}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-purple-600 transition">
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">By {post.author?.name}</span>
          {admin && (
            <div className="space-x-2">
              <Link
                to={`/admin/post/${post._id}/edit`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Edit
              </Link>
              <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;