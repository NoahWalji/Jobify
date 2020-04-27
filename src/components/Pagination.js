import React from "react";

const Pagination = ({jobsPerPage, totalJobs, paginate, currentPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalJobs/jobsPerPage); i++) {
    pageNumbers.push(i);
  }
  return(

    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-num">
            <button onClick={() => paginate(number)} className={(currentPage === number) ? 'page-link-active' : 'page-link'}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination;
