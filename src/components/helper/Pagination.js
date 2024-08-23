import React from "react";

const Pagination = ({ currentPage, onPageChange, totalItems, itemPerPage }) => {
  const maxPages = Math.ceil(totalItems / itemPerPage);
  const gotoPrevPage = () => {
    onPageChange(currentPage - 1);
  };
  const gotoNextPage = () => {
    onPageChange(currentPage + 1);
  };
  return (
    <>
      <div className="custom-pagination">
        <ul className="pagination">
          {currentPage > 1 && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={gotoPrevPage}
                disabled={currentPage === 1}
                aria-label="Previous"
              >
                «
              </button>
            </li>
          )}
          {currentPage > 1 && (
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                
              >
                {currentPage - 1}
              </a>
            </li>
          )}
          <li className="page-item active">
            <a className="page-link" >
              {currentPage}
            </a>
          </li>

          {currentPage < maxPages && (
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => onPageChange(currentPage + 1)}
              >
                {currentPage + 1}
              </a>
            </li>
          )}
          {currentPage < maxPages && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={gotoNextPage}
                disabled={currentPage >= maxPages}
                aria-label="Next"
              >
                »
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Pagination;
