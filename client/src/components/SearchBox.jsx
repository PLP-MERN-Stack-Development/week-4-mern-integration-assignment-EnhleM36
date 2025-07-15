import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/posts/search/${keyword}`);
    } else {
      navigate('/posts');
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search posts..."
        className="w-full px-4 py-2 rounded-l text-gray-800 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-purple-800 hover:bg-purple-700 px-4 py-2 rounded-r transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;