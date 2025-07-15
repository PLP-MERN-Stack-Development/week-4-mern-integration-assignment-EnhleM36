import { Link, useParams } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const { pageNumber } = useParams();

  return (
    pages > 1 && (
      <div className="flex justify-center mt-8">
        <nav className="flex items-center space-x-2">
          {[...Array(pages).keys()].map((x) => (
            <Link
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/posts/search/${keyword}/page/${x + 1}`
                    : `/posts/page/${x + 1}`
                  : `/admin/postlist/page/${x + 1}`
              }
              className={`px-4 py-2 rounded-full ${
                x + 1 === (pageNumber ? Number(pageNumber) : page)
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-purple-600 hover:bg-purple-100'
              }`}
            >
              {x + 1}
            </Link>
          ))}
        </nav>
      </div>
    )
  );
};

export default Paginate;