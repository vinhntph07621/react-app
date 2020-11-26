import createPagination from "./createPagination";
import React, { useState } from "react";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const { pagination } = createPagination({
    numberOfArticles: 223,
    articlesPerPage: 12,
    numberOfButtons: 8,
    currentPage,
  });

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const { data } = await axios.get(
  //       ""
  //     );
  //   };

  //   fetchPosts();
  // }, []);

  const handleClick = (page) => setCurrentPage(page);
  return (
    <div className="pagination">
      <ul>
        <li
          className={`${pagination[0] === currentPage && "disabled"}`}
          onClick={handleClick.bind(null, currentPage - 1)}
        >
          Prev
        </li>
        {pagination.map((page, index) => (
          <li
            key={index}
            className={`${currentPage === page && "active"}`}
            onClick={handleClick.bind(null, page)}
          >
            {page}
          </li>
        ))}
        <li
          className={`${pagination.reverse()[0] === currentPage && "disabled"}`}
          onClick={handleClick.bind(null, currentPage + 1)}
        >
          Next
        </li>
      </ul>
    </div>
  );
}
